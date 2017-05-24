var expect = require('chai').expect;
var constants = require('../src/const');

describe('constants', function(){

  it('should include api url', function(){
    expect(constants.url).to.equal('${ABX_URL}');
  });

});
