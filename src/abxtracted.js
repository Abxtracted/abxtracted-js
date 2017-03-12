'use strict';

(function (root) {
  var $private = {
    baseUrl: 'http://localhost:8080/'
  };
  var $public = {};

  $private.httpGet = function(url, callback){
    var xhr = new XMLHttpRequest();
    var isAsync = typeof callback == 'function';
    xhr.onload = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              if (isAsync){
                var responseBody = undefined;
                if(xhr.responseText)
                  responseBody = JSON.parse(xhr.responseText);
                callback(responseBody);
              }
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.open("GET", url, isAsync);
    xhr.send(null);

    if(!isAsync){
      var responseBody = undefined;
      if(xhr.responseText)
        responseBody = JSON.parse(xhr.responseText);
      return responseBody;
    }
  }

  $public.initialize = function(projectId){
    $private.projectId = projectId;
  }

  $private.validate = function(){
    if(!$private.projectId){
      throw "Abxtracted not initialized, please call abxtracted.initialize(projectId)";
    }
  }

  $public.getScenario = function(experimentKey, userIdentity, callback){
    $private.validate();
    var url = $private.baseUrl + "public/project/" + $private.projectId +
      "/customer/" + userIdentity +"/experiment/" + experimentKey;
    return $private.httpGet(url, callback);
  }

  $public.complete = function(experimentKey, userIdentity, callback){
    $private.validate();
    var url = $private.baseUrl + "public/project/" + $private.projectId +
      "/customer/" + userIdentity +"/experiment/" + experimentKey
      + "/check/complete";
    return $private.httpGet(url, callback);
  };

  root.abxtracted = $public;
})(this);

