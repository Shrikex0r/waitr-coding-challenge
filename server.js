'use strict';

var Http = require('http');
var Express = require('express');
var BodyParser = require('body-parser');
var Swaggerize = require('swaggerize-express');
var Path = require('path');

var App = Express();

var Server = Http.createServer(App);

App.use(BodyParser.json());
App.use(BodyParser.urlencoded({
    extended: true
}));

// the connect-pgclient middleware should manage connection lifecycle for us
var pgclient = require('connect-pgclient');
var dbMiddleware = pgclient({
    // Use all defaults; everything should be derived from context
    config : {
        connectionString: process.env.DATABASE_URL,
        ssl: false
    },
});
App.use(dbMiddleware)

App.use(Swaggerize({
    api: Path.resolve('./config/swagger.yaml'),
    handlers: Path.resolve('./handlers')
}));

// Initialize a database connection pool and make it available to the request.
// TODO: unsure of the lifecycle here. Does this create a new connection pool for each request? I sure hope not.
// Does async cause issues in a middleware context? Let's find out!
let databaseConnectionPool = async function(req, res, next) {
    console.log("connecting to " + process.env.DATABASE_URL);

    const { Pool } = require('pg')
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: false
    });

    // Doing the connect here incurs an obligation to release the client when done.
    // TODO: is there a lifecycle hook that can be installed after the main handler, to clean up resources?
    // for now, we'll just be super careful to call client.release in each handler, but boy is that ugly and
    // failure-prone and in need of fixing.
    let client = await pool.connect()

    // TODO what's the preferred way of having properly defined and scoped context objects? Just randomly adding fields
    // to an object here and expecting the downstream consumer to know about them... blerg.
    req.dbClient = client

    next()
}

// App.use(databaseConnectionPool)

// Derive port from environment variable; default to 8000 if not set
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}

Server.listen(port, function () {
    App.swagger.api.host = this.address().address + ':' + this.address().port;
    /* eslint-disable no-console */
    console.log('App running on %s:%d', this.address().address, this.address().port);
    console.log('Will attempt to connect to Postgres at %s', process.env.DATABASE_URL);
    /* eslint-disable no-console */
});
