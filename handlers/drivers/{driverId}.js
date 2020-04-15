'use strict';

/**
 * Operations on /drivers/{driverId}
 */
module.exports = {
    /**
     * summary: 
     * description: 
     * parameters: 
     * produces: 
     * responses: 200, 404
     */
    get: async function GetDriver(req, res, next) {
        // TODO shove this into middleware and pull a pooled connection from the context
        console.log("connecting to " + process.env.DATABASE_URL);

        const { Pool } = require('pg')
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        });

        try {
            const client = await pool.connect()
            const result = await client.query('SELECT * FROM temp');
            console.log(result.rows)
            client.release();
        } catch (err) {
            console.error(err);
            res.status(404).send(err);
            return;
        }

        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['get']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
