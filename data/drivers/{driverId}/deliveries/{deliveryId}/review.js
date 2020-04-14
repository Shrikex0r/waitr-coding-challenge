'use strict';
var Mockgen = require('../../../../mockgen.js');
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
     * operationId: CreateDeliveryReview
     */
    post: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/drivers/{driverId}/deliveries/{deliveryId}/review',
                operation: 'post',
                response: '200'
            }, callback);
        }
    }
};
