var expect = require('chai').expect;
var Abx = require('../src/abxtracted');

describe('Abxtracted', function(){

  it('should contain Experiment lib module', function(){
    var experiment = new Abx.Experiment();
    expect(experiment.getScenario).to.be.defined;
    expect(experiment.complete).to.be.defined;
  });

});
