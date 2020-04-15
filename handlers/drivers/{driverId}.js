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
            if (!Array.isArray(result.rows) || !result.rows.length) {
                res.status(404).send();
            } else {
                res.status(200).send(result.rows[0]);
            }
        } catch (err) {
            console.error(err);
            // TODO do we really want to send 404 for an internal error? This should be 5xx... but the spec disagrees.
            res.status(404).send(err);
        } finally {
            req.dbClient.release();
        }
  }
};
