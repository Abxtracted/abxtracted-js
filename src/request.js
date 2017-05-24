'use strict';

module.exports = (function(){
  function httpGet(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if(xhr.responseText && typeof callback == 'function')
            callback(JSON.parse(xhr.responseText));
          else
            callback();
        } else {
          console.error(xhr.statusText);
        }
      }
    }
    xhr.open('GET', url, true);
    xhr.send(null);

    return xhr;
  }

  return {
    get: httpGet
  }
})();
