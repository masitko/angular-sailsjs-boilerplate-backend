
var _ = require('lodash');

/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = _.merge(_.cloneDeep(require('../base/Model')), {
  attributes: {
    username: {
      type: 'string',
      unique: true
    },
    email: {
      type: 'email',
      unique: true
    },
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    admin: {
      type: 'boolean',
      defaultsTo: false
    },

    // Below is all specification for relations to another models

    // Passport configurations
    passports: {
      collection: 'Passport',
      via: 'user'
    },
    // Message objects that user has sent
    messages: {
      collection: 'Message',
      via: 'user'
    },
    // Login objects that are attached to user
    logins: {
      collection: 'UserLogin',
      via: 'user'
    },
    requestLogs: {
      collection: 'RequestLog',
      via: 'user'
    },

    // Below are relations to another objects via generic 'createdUser' and 'updatedUser' properties

    roles: {
      collection: 'Role',
      via: 'users',
      dominant: true
    },
    // Authors
    createdAuthors: {
      collection: 'Author',
      via: 'createdUser'
    },
    updatedAuthors: {
      collection: 'Author',
      via: 'updatedUser'
    },

    // Books
    createdBooks: {
      collection: 'Book',
      via: 'createdUser'
    },
    updatedBooks: {
      collection: 'Book',
      via: 'updatedUser'
    }
  },
  /**
   * Attach default Role to a new User
   */
  afterCreate: [
    function setOwner (user, next) {
      sails.log.verbose('User.afterCreate.setOwner', user);
      User
        .update({ id: user.id }, { owner: user.id })
        .then(function (user) {
          next();
        })
        .catch(function (e) {
          sails.log.error(e);
          next(e);
        });
    },
//    function attachDefaultRole (user, next) {
//      sails.log('User.afterCreate.attachDefaultRole', user);
//      User.findOne(user.id)
//        .populate('roles')
//        .then(function (_user) {
//          user = _user;
//          return Role.findOne({ name: 'operator' });
//        })
//        .then(function (role) {
//          user.roles.add(role.id);
//          return user.save();
//        })
//        .then(function (updatedUser) {
//          sails.log.silly('role "registered" attached to user', user.username);
//          next();
//        })
//        .catch(function (e) {
//          sails.log.error(e);
//          next(e);
//        })
//    }
  ]  
});
