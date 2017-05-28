var BASE_API_URL = require('../src/constants').url;
var expect = require('chai').expect;
var endpoint = require('../src/endpoint');

describe('Endpoint', function(){

  it('should build url to get experiment scenario', function(){
    var expectedUrl = BASE_API_URL + '/public' +
                      '/project/123' +
                      '/customer/456' +
                      '/experiment/signup_button';
    var url = endpoint.buildGetScenarioUrl('456', '123', 'signup_button');
    expect(url).to.equal(expectedUrl);
  });

  it('should build url to complete experiment', function(){
    var expectedUrl = BASE_API_URL + '/public' +
                      '/project/123' +
                      '/customer/456' +
                      '/experiment/signup_button' +
                      '/check/complete';
    var url = endpoint.buildCompleteUrl('456', '123', 'signup_button');
    expect(url).to.equal(expectedUrl);
  });

});
