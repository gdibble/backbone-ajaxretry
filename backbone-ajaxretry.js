/*!
 * Backbone.js ajaxRetry - v1.0.0 - 2014-04-07
 * https://github.com/gdibble/backbone-ajaxretry
 * Copyright 2014 Gabriel Dibble; Licensed MIT
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Extend Backbone.ajax's proxy of $.ajax with Exponential Retries on req fail
 *  * Default settings:
 *      {
 *        "base": 2.67,
 *        "y": 0.25,
 *        "retryCount": 2,
 *      }
 *  * Overwrite default settings via set function
 *  * Pass 'exhaust' option as callback - when retries fail, run this function
 *    (if 'exhaust' method is not passed, retries will end without callback)
 *    Example:
 *      myModel.fetch({
 *        exhaust : function () {
 *          //handle error
 *        }
 *      });
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


var Backbone = require('backbone');
var _        = require('underscore');
//Defaults that can be overridden via set
var settings = {
  base:       2.718281828,
  y:          0.25,
  retryCount: 3
};

//-----------------------------------------------------------------------------


// Helpers:
//  some console.logs have been left (as to be enabled) for those curious minds


//Update current settings, overriding defaults
function setOptions(options) {
  _.defaults(options, settings);
  settings = options;
}

//returns delay in milliseconds
function exponentialDelay(x) {
  return (Math.pow(settings.base, x) - settings.y) * 1000;
}

//hit retry limit
function exhausted() {
  // console.log('exhausted', this.url);
  if (this.hasOwnProperty('exhaust')) {
    // console.log('>>> called this.exhaust', this.exhaust);
    this.exhaust();
  }
}

//recurse the ajax request
function ajaxRetry() {
  var self = this;
  if (this.hasOwnProperty('retries')) {
    this.recursed = this.recursed === undefined ? 0 : this.recursed + 1;
    if (this.recursed < this.retries) {
      setTimeout(function () {
        $.ajax(self);
        // console.log('recursed', self.url, self.recursed, 'in ' + exponentialDelay(self.recursed) + 'ms');
      }, exponentialDelay(this.recursed));
    } else {
      exhausted.call(self);
    }
  } else {
    exhausted.call(self);
  }
}

//-----------------------------------------------------------------------------


//extend for retry functionality
Backbone.ajax = function (options) {
  var args = Array.prototype.slice.call(arguments, 0);
  _.extend(args[0], options ? options : {}, {
    retries: settings.retryCount,
    error:   function () { ajaxRetry.apply(this); }
  });
  return Backbone.$.ajax.apply(Backbone.$, args);
};

module.exports = { set: setOptions };
