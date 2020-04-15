# Description
This project is an implementation of the [Waitr coding challenge](https://github.com/WaitrInc/coding-challenge).

It takes the back-end track for the delivery review specs.

# Technologies
This project was a leap into the unknown for me - I've had very limited Node exposure, and no experience at all with
Heroku, the Express framework, asynchronous javascript, the Swagger code generator toolkit, or any of the included 3p
packages.

The project is currently running on Heroku, connected to a postgresql backend. Database connections are vended to 
route handlers via middleware, and all of the I/O on the frontend is JSON-based. 

Unfortunately, the time required to research all these new components and stand up a new service ate into the time I 
would have otherwise used to write a more extensive test suite. In fact, due to some difficulties with mocking out the
postgres backend, I ended up with no test coverage. To make up for this fact, I've described the test cases I would
have implemented had I been able to figure out the correct set of tools and idioms for this new stack. More details
are available in the README file inside the `tests` directory.

# File and directory structure
- Project root
  - Procfile: this is the main Heroku entrypoint and specifies how to run the application on Heroku.
  - server.js: main node entrypoint. Here is where the database connection is set up and provided to the route handlers 
    via middleware.
  - tests/: this is where automated tests should be. Instead, there is a README.md explaining in more detail why actual
    tests are not here.
  - specs/: this contains the original spec copied from the coding challenge project, which was used to drive the 
    swagger code generator.
  - db/: Contains database schema info and seed data. Consult schema.sql for a list of valid driver and delivery IDs.
  - config/: This folder and its contents were created by the swagger generator from the original spec file.
  - handlers/: This contains the implementations for the 3 main function points: driver get-by-id, post new review, and
    find reviews for a driver by id.
    
## What's _missing_ from source control
I did not find a way to export the existing infra stack definition (Heroku + app instance + linked pgsql database) as
a manifest that could be used to recreate the application instance from scratch. I believe such tooling likely exists, 
but I haven't found it yet.
    
# Code and service locations
Code is on github: https://github.com/Shrikex0r/waitr-coding-challenge

The service is hosted on Heroku: https://waitr-coding-challenge.herokuapp.com

Note that in order to create a review for an existing driver/delivery tuple, you must provide a Content-Type header
with the value "application/json" or the request will not be processed.