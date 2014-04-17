# Backbone.js ajaxRetry

#### Exponentially retry Backbone.ajax requests

---

Extend Backbone.ajax's proxy of $.ajax with Exponential Retries on request fail.

&nbsp;

## Installation

In your client app `main.js`, simply add:

  ```javascript
var ajaxRetry = require('backbone-ajaxretry');
```

&nbsp;

## Usage
The defaults settings are:

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
  exhaust : function () {
    //handle error
  }
});
```

&nbsp;

---

Dependency: Underscore.js
**Implied: Backbone.js*
