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
            console.log(req.params);
            const stmt = 'select id, name from drivers where id = $1';
            const values = [req.params.driverId]
            const result = await req.dbClient.query(stmt, values);
            console.log(result.rows);
            // TODO cleanup
            res.status(200).send(result.rows[0]);
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
