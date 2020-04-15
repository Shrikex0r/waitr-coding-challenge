'use strict';
var dataProvider = require('../../../../../data/drivers/{driverId}/deliveries/{deliveryId}/review.js');
/**
 * Operations on /drivers/{driverId}/deliveries/{deliveryId}/review
 */
module.exports = {
    /**
     * summary: 
     * description: 
     * parameters: 
     * produces: 
     * responses: 200
     */
    post: async function CreateDeliveryReview(req, res, next) {
        console.log(req.body.rating);
        console.log(req.body.description);

        try {
            // TODO confirm that driver req.params.driverId exists
            // TODO confirm that delivery req.params.deliveryId exists
            // bail with a 404 if the driver or delivery doesn't exist

            console.log(req.params);
            const stmt = 'insert into delivery_reviews (delivery_id, rating, description) values ($1, $2, $3)';
            const values = [
                req.params.deliveryId,
                req.body.rating,
                req.body.description
            ];
            const result = await req.dbClient.query(stmt, values);
            console.log(result);

            res.status(200).send(result);
        } catch (err) {
            console.error(err);
            // TODO do we really want to send 404 for an internal error? This should be 5xx... but the spec disagrees.
            res.status(404).send(err);
        } finally {
            req.dbClient.release();
        }
    }
};
