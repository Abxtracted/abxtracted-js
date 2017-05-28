'use strict';

var BASE_API_URL = require('./constants').url;
var BASE_EXPERIMENT_ENDPOINT = BASE_API_URL + '/public' +
                                              '/project/{projectId}' +
                                              '/customer/{customerId}' +
                                              '/experiment/{experimentKey}';
var EXPERIMENT_COMPLETE_ENDPOINT =  BASE_EXPERIMENT_ENDPOINT +
                                    '/check/complete';

var _public = {};

_public.buildGetScenarioUrl = function(customerId, projectId, experimentKey){
  return buildExperimentUrl(BASE_EXPERIMENT_ENDPOINT, {
    customerId: customerId,
    projectId: projectId,
    experimentKey: experimentKey
  });
};

_public.buildCompleteUrl = function(customerId, projectId, experimentKey){
  return buildExperimentUrl(EXPERIMENT_COMPLETE_ENDPOINT, {
    customerId: customerId,
    projectId: projectId,
    experimentKey: experimentKey
  });
};

function buildExperimentUrl(endpoint, params){
  var url = endpoint;
  for(var param in params)
    url = url.replace('{' + param + '}', params[param]);
  return url;
}

module.exports = _public;
