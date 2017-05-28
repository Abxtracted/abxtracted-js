var sinon = require('sinon');
var chai = require('chai');
var expect = require('chai').expect;
var customer = require('../src/customer');
var http = require('../src/http');
var Experiment = require('../src/experiment');

describe('Experiment', function() {

  var MOCK_CUSTOMER_ID = '0fbe5f20';
  var MOCK_PROJECT_ID = '123';
  var MOCK_EXPERIMENT_KEY = 'buy_button';
  var MOCK_SCENARIO_URL = '${ABX_URL}/public/' +
                          'project/' + MOCK_PROJECT_ID +
                          '/customer/' + MOCK_CUSTOMER_ID +
                          '/experiment/' + MOCK_EXPERIMENT_KEY;
  var MOCK_COMPLETE_URL = MOCK_SCENARIO_URL + '/check/complete';
  var COOKIES_UNAVAILABLE_MESSAGE = 'Abxtracted was not able to identify ' +
                                    'customer: Cookies unavailable';

  var mockParams,
    instantiateExperiment,
    stubCustomerBuildId,
    stubCustomerLookForId,
    stubHttpGet;

  beforeEach(function(){
    mockParams = {
      success: sinon.stub(),
      error: sinon.stub()
    };

    instantiateExperiment = function(){
      return new Experiment(MOCK_PROJECT_ID, MOCK_EXPERIMENT_KEY);
    };

    stubCustomerBuildId = sinon.stub(customer, 'buildId');
    stubCustomerLookForId = sinon.stub(customer, 'lookForId');
    stubHttpGet = sinon.stub(http, 'get');
  });

  afterEach(function(){
    stubCustomerBuildId.restore();
    stubCustomerLookForId.restore();
    stubHttpGet.restore();
  });

  it('should request the experiment scenario with given customer id', function(){
    var experiment = instantiateExperiment();
    mockParams.customerId = MOCK_CUSTOMER_ID;
    experiment.getScenario(mockParams);
    expect(stubHttpGet.firstCall.args[0]).to.equal(MOCK_SCENARIO_URL);
    expect(stubHttpGet.firstCall.args[1]).to.equal(mockParams);
  });

  it('should not build customer id on getting scenario when customer id is given', function(){
    var experiment = instantiateExperiment();
    mockParams.customerId = MOCK_CUSTOMER_ID;
    experiment.getScenario(mockParams);
    expect(stubCustomerBuildId.called).to.equal(false);
  });

  it('should build customer id on getting scenario when customer id is not given', function(){
    var experiment = instantiateExperiment();
    experiment.getScenario(mockParams);
    expect(stubCustomerBuildId.called).to.equal(true);
  });

  it('should request the experiment scenario when customer id is not given', function(){
    stubCustomerBuildId.returns('def456');
    var experiment = instantiateExperiment();
    var url = MOCK_SCENARIO_URL.replace(MOCK_CUSTOMER_ID, 'def456');
    experiment.getScenario(mockParams);
    expect(stubHttpGet.firstCall.args[0]).to.equal(url);
    expect(stubHttpGet.firstCall.args[1]).to.equal(mockParams);
  });

  it('should not request the experiment scenario when is not possible build customer id', function(){
    stubCustomerBuildId.returns(null);
    var experiment = instantiateExperiment();
    experiment.getScenario(mockParams);
    expect(stubHttpGet.called).to.equal(false);
  });

  it('should call error on get scenario when build customer id was not possible', function(){
    stubCustomerBuildId.returns(null);
    var experiment = instantiateExperiment();
    experiment.getScenario(mockParams);
    expect(mockParams.error.firstCall.args[0]).to.equal(COOKIES_UNAVAILABLE_MESSAGE);
  });

  it('should not call error on get scenario when build customer id was not possible and error callback was not given', function(){
    stubCustomerBuildId.returns(null);
    var experiment = instantiateExperiment();
    delete mockParams.error;
    experiment.throwCustomerIdentificationError = sinon.spy();
    experiment.getScenario(mockParams);
    expect(experiment.throwCustomerIdentificationError.called).to.equal(false);
  });

  it('should request the experiment completation with given customer id', function(){
    var experiment = instantiateExperiment();
    mockParams.customerId = MOCK_CUSTOMER_ID;
    experiment.complete(mockParams);
    expect(stubHttpGet.firstCall.args[0]).to.equal(MOCK_COMPLETE_URL);
    expect(stubHttpGet.firstCall.args[1]).to.equal(mockParams);
  });

  it('should request the experiment completation with built customer id', function(){
    stubCustomerLookForId.returns('def456');
    var experiment = instantiateExperiment();
    var url = MOCK_COMPLETE_URL.replace(MOCK_CUSTOMER_ID, 'def456');
    experiment.complete(mockParams);
    expect(stubHttpGet.firstCall.args[0]).to.equal(url);
    expect(stubHttpGet.firstCall.args[1]).to.equal(mockParams);
  });

  it('should not request the experiment completation when customer id was not built', function(){
    stubCustomerLookForId.returns(null);
    var experiment = instantiateExperiment();
    experiment.complete(mockParams);
    expect(stubHttpGet.called).to.equal(false);
  });

  it('should call error on experiment complete when build customer id was not possible', function(){
    stubCustomerLookForId.returns(null);
    var experiment = instantiateExperiment();
    experiment.complete(mockParams);
    expect(mockParams.error.firstCall.args[0]).to.equal(COOKIES_UNAVAILABLE_MESSAGE);
  });

  it('should not call error on experiment complete when build customer id was not possible and error callback was not given', function(){
    stubCustomerBuildId.returns(null);
    var experiment = instantiateExperiment();
    delete mockParams.error;
    experiment.throwCustomerIdentificationError = sinon.spy();
    experiment.complete(mockParams);
    expect(experiment.throwCustomerIdentificationError.called).to.equal(false);
  });

});
