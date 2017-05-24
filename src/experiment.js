'use strict';

var request = require('./request');
var baseUrl = require('./const').url;

module.exports = (function(){
  var Experiment = function(projectId, experimentKey){
    this.projectId = projectId;
    this.experimentKey = experimentKey;
  };

  Experiment.prototype.getScenario = function(userIdentity, callback){
    var url = baseUrl + "/public/project/" + this.projectId +
    "/customer/" + userIdentity +"/experiment/" + this.experimentKey;
    request.get(url, callback);
  };

  Experiment.prototype.complete = function(userIdentity, callback){
    var url = baseUrl + "/public/project/" + this.projectId +
    "/customer/" + userIdentity +"/experiment/" + this.experimentKey
    + "/check/complete";
    request.get(url, callback);
  };

  return Experiment;
})();
