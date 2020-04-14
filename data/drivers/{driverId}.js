'use strict';
var Mockgen = require('../mockgen.js');
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
     * operationId: GetDriver
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/drivers/{driverId}',
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
                path: '/drivers/{driverId}',
                operation: 'get',
                response: '404'
            }, callback);
        }
    }
};
