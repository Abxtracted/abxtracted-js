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
  return buildExperimentUrl(BASE_EXPERIMENT_ENDPOINT, customerId, projectId, experimentKey);
};

_public.buildCompleteUrl = function(customerId, projectId, experimentKey){
  return buildExperimentUrl(EXPERIMENT_COMPLETE_ENDPOINT, customerId, projectId, experimentKey);
};

function buildExperimentUrl(endpoint, customerId, projectId, experimentKey){
  return  endpoint.replace('{customerId}', customerId)
                  .replace('{projectId}', projectId)
                  .replace('{experimentKey}', experimentKey);
}

module.exports = _public;
