'use strict';

var _ = require('lodash');

/**
 * Policy to check if current user is admin or not.
 *
 * @param   {Request}   request     Request object
 * @param   {Response}  response    Response object
 * @param   {Function}  next        Callback function
 *
 * @returns {*}
 */
module.exports = function isAdmin(request, response, next) {
  sails.log.verbose(__filename + ':' + __line + ' [Policy.isAdmin() called]');

  // Fetch current user by the token
  sails.models['user']
    .findOne(request.token)
    .populate('roles')
    .exec(function exec(error, user) {
        
        console.log(_.find(user.roles, {'name': 'admin1'} ) === void 0);
      if (error) {
        next(error);
      } else if (!user) {
        error = new Error();

        error.status = 401;
        error.message = 'User not found - Please login.';

        next(error);
//      } else if (user.admin) {
      } else if (_.find(user.roles, {'name': 'admin'} ) !== void 0) {
        next();
      } else {
        error = new Error();

        error.status = 403;
        error.message = 'Forbidden - You are not administrator user.';

        next(error);
      }
    })
};
