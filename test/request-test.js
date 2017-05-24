var sinon = require('sinon');
var chai = require('chai');
var spies = require('chai-spies');
var assert = require('chai').assert;
var expect = require('chai').expect;
var XMLHttpRequestMock = require('./xml-http-request-mock');
var request = require('../src/request');

chai.use(spies);

describe('Request', function(){

  var URL = 'http://api.abxtracted.com/endpoint';

  it('should execute a GET request', function(){
    var xhr = request.get(URL, function(){});
    expect(xhr).to.be.defined;
  });

  it('should respond a GET request successfully', function(){
    var expectedResponse;
    var responseMock = '';
    var callback = function(response){
      expectedResponse = response;
    };

    var xhr = request.get(URL, callback);
    xhr.readyState = 4;
    xhr.status = 200;
    xhr.responseText = '{"scenario":"variation"}';
    xhr.onload();

    expect(expectedResponse.scenario).to.equal('variation');
  });

  it('should respond a GET request successfully even when response has no text', function(){
    var expectedResponse;
    var callback = function(response){
      expectedResponse = response;
    };

    var xhr = request.get(URL, callback);
    xhr.readyState = 4;
    xhr.status = 200;
    xhr.onload();

    expect(expectedResponse).to.be.undefined;
  });

  it('should not respond until request get fulfilled', function(){
    var expectedResponse;
    var callback = sinon.spy();

    var xhr = request.get(URL, callback);
    xhr.onload();

    assert(callback.notCalled);
  });

  it('should log error when request fails', function(){
    var errorMessage = 'It seems to be a bad request';
    var xhr = request.get(URL);

    chai.spy.on(console, 'error');

    xhr.readyState = 4;
    xhr.status = 400;
    xhr.statusText = errorMessage;
    xhr.onload();

    expect(console.error).to.have.been.called.with(errorMessage);
  });

});
