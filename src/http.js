'use strict';

var _public = {};

_public.get = function(url, params){
  var xhr = new XMLHttpRequest();
  var success = params.success;
  var error = params.error;

  xhr.onload = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if(typeof success === 'function')
          _public.complete(parseResponse(xhr.responseText), success);
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

function parseResponse(responseText){
  var response;
  try {
    response = JSON.parse(responseText);
  } catch(err) {
    response = '';
  }
  return response;
}

module.exports = _public;
