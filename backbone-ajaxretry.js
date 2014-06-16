/*!
 * Backbone.js ajaxRetry
 * https://github.com/gdibble/backbone-ajaxretry
 * Copyright 2014 Gabriel Dibble; Licensed MIT
 */
(function (define) { define(function (require, exports, module) { //'use strict';


var _$ajax;
var Backbone = require('backbone');
var _        = require('underscore');
//Defaults that can be overridden via set
var settings = {
  base:         2.718281828,
  y:            0.25,
  retryCount:   3,
  onlyBackbone: false
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
  var args = Array.prototype.slice.call(arguments, 0);
  _.extend(args[0], this);
  // console.log('exhausted', this.url);
  if (this.hasOwnProperty('exhaust')) {
    // console.log('>>> called this.exhaust', this.exhaust);
    this.exhaust.apply(this, args);
  }
}

//recurse the ajax request
function ajaxRetry(jqXHR) {
  var self = this;
  if (this.hasOwnProperty('retries')) {
    this.recursed = this.recursed === undefined ? 0 : this.recursed + 1;
    if ((jqXHR && jqXHR.status < 500) || this.recursed >= this.retries) {
      exhausted.apply(self, arguments);
    } else if (this.recursed < this.retries) {
      setTimeout(function () {
        $.ajax(self);
        // console.log('recursed', self.url, self.recursed, 'in ' + exponentialDelay(self.recursed) + 'ms');
      }, exponentialDelay(this.recursed));
    }
  } else {
    exhausted.apply(self, arguments);
  }
}

function extender(args, options) {
  _.extend(args[0], options && typeof options === 'object' ? options : {}, {
    retries: settings.retryCount,
    error:   function () { ajaxRetry.apply(this, arguments); }
  });
}

function sliceArguments() {
  return Array.prototype.slice.call(arguments, 0);
}

//-----------------------------------------------------------------------------


//extend for retry functionality:
if (!settings.onlyBackbone) {
  //retry regular $.ajax thus also Backbone ajax requests
  _$ajax = $.ajax;
  $.ajax = function (options) {
    var args;
    if (typeof options === 'string') {
      arguments[1].url = options; //in this case, options is actually the url passed to $.get/$.post
      args = sliceArguments(arguments[1]);
      extender(args, options);
    } else {
      args = sliceArguments(arguments);
      extender(args, options);
    }
    return _$ajax.apply($, args);
  };
} else {
  //retry only Backbone ajax requests422
  Backbone.ajax = function (options) {
    var args = sliceArguments(arguments);
    extender(args, options);
    return Backbone.$.ajax.apply(Backbone.$, args);
  };
}


module.exports = { set: setOptions };


}); }(typeof define === 'function' && define.amd ? define : function (factory) { factory(require, exports, module); })); //end UMD CommonJS wrapper
