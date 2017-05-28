'use strict';

var _public = {};

_public.get = function(url, params){
  var xhr = new XMLHttpRequest();
  var success = params.success;
  var error = params.error;

  xhr.onload = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if(xhr.responseText && typeof success === 'function')
          _public.complete(JSON.parse(xhr.responseText), success);
      } else if(typeof error === 'function') {
        _public.complete(xhr.statusText, error);
      }
    }
  };

  xhr.open('GET', url, true);
  xhr.send(null);

  return xhr;
};

_public.complete = function(response, callback){
  callback(response);
};

module.exports = _public;
