# Backbone.js ajaxRetry

#### Exponentially retry Backbone.ajax requests

---

Extend Backbone.ajax's proxy of $.ajax with Exponential Retries on request fail.

&nbsp;


## Installation

1. Create settings file: '/node_modules/backbone-ajaxretry/settings.json'

  This example settings file will retry Backbone.ajax requests two times with the timing shown in `note`

  ```json
{
  "base": 2.67,
  "y": 0.25,
  "retryCount": 2,
  "uri": "http://fooplot.com/plot/3sb933ziv7",
  "note": "750ms >> 2,420ms (3.17s Total)"
}
```
  *notice: `base`^0 = 1, thus **1 minus `y` gives the initial delay in seconds***


2. In your client app 'main.js', simply add:

  ```javascript
var ajaxRetry = require('backbone-ajaxretry');
```

&nbsp;


## Usage
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
