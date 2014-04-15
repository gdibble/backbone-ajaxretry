# Backbone.js ajaxRetry

#### Exponentially retry Backbone.ajax requests

---

Extend Backbone.ajax's proxy of $.ajax with Exponential Retries on request fail.

&nbsp;


## Installation

In your client app 'main.js', simply add:

  ```javascript
var ajaxRetry = require('backbone-ajaxretry');
```

The defaults settings are:

```json
{
  base: 2.67,
  y: 0.25,
  retryCount: 2
}
```

## Usage

Override any of the default settings using `set`, passing arguments
   as keyword arguments

```javascript
ajaxRetry({y: 0.3});
```

* Pass 'exhaust' option as callback - when retries fail, run this function

  (if 'exhaust' method is not passed, retries will end without callback)

```javascript
myModel.fetch({
  exhaust : function () {
    //handle error
  }
});
```

&nbsp;

Dependencies: Backbone.js and underscore.js
