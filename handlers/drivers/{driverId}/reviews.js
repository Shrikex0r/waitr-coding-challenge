'use strict';

/**
 * Operations on /drivers/{driverId}/reviews
 */
module.exports = {
    /**
     * summary: 
     * description: 
     * parameters: 
     * produces: 
     * responses: 200, 404
     */
    get: async function GetDriverReviews(req, res, next) {
        try {
            console.log(req.params);
            const stmt = 'select delivery_reviews.id,' +
                ' delivery_reviews.delivery_id,' +
                ' delivery_reviews.rating,' +
                ' delivery_reviews.description' +
                ' from delivery_reviews' +
                ' inner join deliveries on delivery_reviews.delivery_id = deliveries.id' +
                ' where deliveries.driver_id = $1';
            const values = [req.params.driverId]
            const result = await req.dbClient.query(stmt, values);
            console.log(result.rows);

            // Bail with a 404 if there are no deliveries or no reviews for the given driver
            if (!Array.isArray(result.rows) || !result.rows.length) {
                res.status(404).send();
            } else {
                res.status(200).send(result.rows);
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
