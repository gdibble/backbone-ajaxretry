# Backbone.js ajaxRetry

#### Exponentially retry Backbone.ajax requests

---

Extend Backbone.ajax's proxy of $.ajax with Exponential Retries on request fail.

&nbsp;

## Installation

```
npm install --save backbone-ajaxretry
```

&nbsp;<br>In your client app `main.js`, simply add:

```javascript
var ajaxRetry = require('backbone-ajaxretry');
```

&nbsp;

## Usage
The default settings are:

```javascript
{
  base: 2.718281828,
  y: 0.25,
  retryCount: 3
}
```

Override any of the default settings using `set`: passing keyword arguments

```javascript
ajaxRetry.set({ y:0.3 });
```
&nbsp;

Pass `exhaust` option as callback - when retries fail, run this 

  * please note that `exhaust` supersedes the `error` callback
  * if `exhaust` method is not passed, retries will end without callback

```javascript
myModel.fetch({
  exhaust : function (jqXHR, textStatus, errorThrown) {
    // Handle Error:
    if (jqXHR.status >= 500) {
      //do something about Server Error
    } else if (jqXHR.status >= 400) {
      //do something about Client Error
    }
  }
});
```

---

&nbsp;

* Changelog &gt;&gt;&gt; [releases](https://github.com/gdibble/backbone-ajaxretry/releases)

* Dependency: [Underscore.js](http://underscorejs.org/)<br>
  *<em>Implied: [Backbone.js](backbonejs.org)<em>
