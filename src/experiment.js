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
  request.call(this, 'scenario', customer.buildId, params);
};

Experiment.prototype.complete = function(params){
  request.call(this, 'complete', customer.lookForId, params);
};

Experiment.prototype.throwCustomerIdentificationError = function(errorCallback){
  var message = 'Abxtracted was not able to identify customer: ' +
                'Cookies unavailable';
  errorCallback(message);
};

function request(type, customerAction, params){
  var url;
  var errorCallback = getErrorCallback(params);
  var customerId = params.customerId || customerAction();
  if(customerId){
    url = buildRequestUrl(type, customerId, this.projectId, this.experimentKey);
    http.get(url, params);
  } else if(errorCallback) {
    this.throwCustomerIdentificationError(errorCallback);
  }
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
