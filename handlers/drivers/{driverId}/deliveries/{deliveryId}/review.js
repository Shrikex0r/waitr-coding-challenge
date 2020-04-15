'use strict';

/**
 * Operations on /drivers/{driverId}/deliveries/{deliveryId}/review
 */
module.exports = {
    /**
     * summary: Create a review for a driver's delivery
     * description: User must pass a JSON-formatted body with the 'rating' and 'description' fields filled in. The
     *  driver ID and delivery ID provided as route parameters must correspond to existing records.
     * parameters:
     *  - driverId (not currently used): the ID of an existing driver
     *  - deliveryId (the ID of an existing delivery
     * responses: 200
     */
    post: async function CreateDeliveryReview(req, res, next) {
        console.log(req.body.rating);
        console.log(req.body.description);

        try {
            // TODO confirm that driver record req.params.driverId exists
            // TODO confirm that delivery record req.params.deliveryId exists
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

            res.status(200).send();
        } catch (err) {
            console.error(err);
            // TODO do we really want to send 404 for an internal error? This should be 5xx... but the spec disagrees.
            res.status(404).send(err);
        } finally {
            req.dbClient.release();
        }
    }
};
