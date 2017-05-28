var expect = require('chai').expect;
var constants = require('../src/constants');

describe('Constants', function(){

  it('should include api url', function(){
    expect(constants.url).to.equal('${ABX_URL}');
  });

  it('should include customer id cookie key', function(){
    expect(constants.customerIdCookieKey).to.equal('abxCustomerId');
  });

});
