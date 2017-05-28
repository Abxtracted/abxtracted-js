'use strict';

var BASE_URL = require('./constants').url;
var customer = require('./customer');
var endpoint = require('./endpoint');
var http = require('./http');

var Experiment = function(projectId, experimentKey){
  this.projectId = projectId;
  this.experimentKey = experimentKey;
};

Experiment.prototype.getScenario = function(params){
  var errorCallback = getErrorCallback(params);
  var customerId = params.customerId || customer.buildId();
  if(customerId)
    request('scenario', customerId, this.projectId, this.experimentKey, params);
  else if(errorCallback)
    this.throwCustomerIdentificationError(errorCallback);
};

Experiment.prototype.complete = function(params){
  var errorCallback = getErrorCallback(params);
  var customerId = params.customerId || customer.lookForId();
  if(customerId)
    request('complete', customerId, this.projectId, this.experimentKey, params);
  else if(errorCallback)
    this.throwCustomerIdentificationError(errorCallback);
};

Experiment.prototype.throwCustomerIdentificationError = function(errorCallback){
  var message = 'Abxtracted was not able to identify customer: ' +
                'Cookies unavailable';
  errorCallback(message);
};

function request(type, customerId, projectId, experimentKey, params){
  var url = buildRequestUrl(type, customerId, projectId, experimentKey);
  http.get(url, params);
}

function buildRequestUrl(type, customerId, projectId, experimentKey){
  if(type === 'scenario')
    return endpoint.buildGetScenarioUrl(customerId, projectId, experimentKey);
  return endpoint.buildCompleteUrl(customerId, projectId, experimentKey);
}

function getErrorCallback(params){
  return params.error;
}

module.exports = Experiment;
