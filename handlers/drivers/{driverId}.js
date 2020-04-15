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
        try {
            const result = await req.dbClient.query('SELECT * FROM temp');
            console.log("result: %s", result);
            console.log("rows: %s", result.rows);
        } catch (err) {
            console.error(err);
            // TODO do we really want to send 404 for an internal error? This should be 5xx... but the spec disagrees.
            res.status(404).send(err);
            return;
        } finally {
            req.dbClient.release();
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
