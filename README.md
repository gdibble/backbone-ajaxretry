# Backbone.js ajaxRetry

#### Exponentially retry Backbone.ajax and $.ajax requests

&nbsp;

## Installation

```
npm install --save backbone-ajaxretry
```

&nbsp;<br>In your client app `main.js`, add the following line to default retry settings:

```javascript
require('backbone-ajaxretry');
```

Or override any of the default settings using `set`: passing keyword arguments

```javascript
require('backbone-ajaxretry').set({ y:0.3 });
```

&nbsp;

## Usage
The default settings are:

```javascript
{
  base: 2.718281828,
  y: 0.25,
  retryCount: 3,
  onlyBackbone: false
}
```

&nbsp;

By default both `Backbone.ajax` and `$.ajax` [Server Errors](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#5xx_Server_Error) are retried. To only retry `Backbone.ajax` requests and not also [regular] `$.ajax` requests, change the `onlyBackbone` default setting to `true`.

For Backbone.js sync, fetch, save or destroy, pass `exhaust` in the options object as a callback function to run when retries fail
  * please note that `exhaust` supersedes the `error` callback
  * if `exhaust` method is not passed, retries will end without further action
  * the returned `jqXHR` object has been extended with the ajax request options, <br>thus allowing `jqXHR.type`, `jqXHR.url`, etcetera

```javascript
// Backbone ex.
myModel.fetch({
  exhaust : function (jqXHR, textStatus, errorThrown) {
    // Handle Internal Server Error
  }
});

// $.ajax ex.
$.ajax({
  url: '/test',
  type: 'GET',
  exhaust : function (jqXHR, textStatus, errorThrown) {
    // Handle Internal Server Error
  }
});
```
&nbsp;

---

* **Changelog &gt;&gt;&gt;** [releases](https://github.com/gdibble/backbone-ajaxretry/releases)

---

* **Dependency:** [Underscore.js](http://underscorejs.org/)
  * ***Implied:***
    * [Backbone.js](http://backbonejs.org)
      * [jQuery](http://jquery.com), [zepto.js](http://zeptojs.com), [ENDER](http://ender.jit.su) **or** even your own `$` library *which defines `$.ajax`*

---

* [npmjs.org/package/backbone-ajaxretry](https://www.npmjs.org/package/backbone-ajaxretry)
