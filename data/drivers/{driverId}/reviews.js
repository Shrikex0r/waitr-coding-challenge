'use strict';
var Mockgen = require('../../mockgen.js');
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
     * operationId: GetDriverReviews
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/drivers/{driverId}/reviews',
                operation: 'get',
                response: '200'
            }, callback);
        },
        404: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/drivers/{driverId}/reviews',
                operation: 'get',
                response: '404'
            }, callback);
        }
    }
};
