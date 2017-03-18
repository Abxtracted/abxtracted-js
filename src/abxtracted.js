'use strict';

(function(root){
  var _baseUrl = "https://app.abxtracted.com";
  var Abx = {}
  root.Abx = Abx;

  Abx.Experiment = function(projectId, experimentKey, baseUrl){
    this.projectId = projectId;
    this.experimentKey = experimentKey;
    this.baseUrl = baseUrl || _baseUrl;
  };

  Abx.Experiment.prototype.getVersion = function(userIdentity, callback){
    var url = this.baseUrl + "/public/project/" + this.projectId +
    "/customer/" + userIdentity +"/experiment/" + this.experimentKey;
    return httpGet(url, callback);
  };

  Abx.Experiment.prototype.complete = function(userIdentity, callback){
    var url = this.baseUrl + "/public/project/" + this.projectId +
    "/customer/" + userIdentity +"/experiment/" + this.experimentKey
    + "/check/complete";
    return httpGet(url, callback);
  };

  function httpGet(url, callback){
    var xhr = new XMLHttpRequest();
    console.log(url, callback)
    xhr.onload = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if(xhr.responseText && typeof callback == 'function')
            callback(JSON.parse(xhr.responseText));
          else
            callback(xhr);
        } else {
          console.error(xhr.statusText);
        }
      }
    }
    xhr.open("GET", url, true);
    xhr.send(null);
  }

})(this);
