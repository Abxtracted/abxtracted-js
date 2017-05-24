var sinon = require('sinon');
var assert = require('chai').assert;
var expect = require('chai').expect;
var Experiment = require('../src/experiment');
var request = require('../src/request');

describe('Experiment', function() {

  it('should request the experiment scenario', function(){
    var experiment = new Experiment('proj123', 'exp_key');
    var expectedGetUrl = '${ABX_URL}/public/project/proj123/customer/123qwe/experiment/exp_key';

    var get = sinon.stub(request, 'get');
    experiment.getScenario('123qwe');
    get.restore();
    assert(get.calledWithMatch(expectedGetUrl));
  });

  it('should request the experiment completion', function(){
    var experiment = new Experiment('proj123', 'exp_key');
    var expectedGetUrl = '${ABX_URL}/public/project/proj123/customer/123qwe/experiment/exp_key/check/complete';

    var get = sinon.stub(request, 'get');
    experiment.complete('123qwe');
    get.restore();
    assert(get.calledWithMatch(expectedGetUrl));
  });

});
