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

            // Bail with a 404 if the record wasn't found
            if (!Array.isArray(result.rows) || !result.rows.length) {
                res.status(404).send();
            } else {
                // Construct a new record decorated with the driver's location data.
                // TODO: this should come from some sort of injected service (not the DB)... just hardcode it for now.
                let row = result.rows[0]
                let record = {
                    'id': row['id'],
                    'name': row['name'],
                    'location': {
                        'latitude': 47.620744,
                        'longitude': -122.349224
                    }
                }

                res.status(200).send(record);
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
