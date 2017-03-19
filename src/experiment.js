'use strict';

const request = require('./request');
const baseUrl = require('./const').url;

module.exports = (function(){
  const Experiment = function(projectId, experimentKey){
    this.projectId = projectId;
    this.experimentKey = experimentKey;
  };

  Experiment.prototype.getVersion = function(userIdentity, callback){
    const url = baseUrl + "/public/project/" + this.projectId +
    "/customer/" + userIdentity +"/experiment/" + this.experimentKey;
    request.get(url, callback);
  };

  Experiment.prototype.complete = function(userIdentity, callback){
    const url = baseUrl + "/public/project/" + this.projectId +
    "/customer/" + userIdentity +"/experiment/" + this.experimentKey
    + "/check/complete";
    request.get(url, callback);
  };

  return Experiment;
})();