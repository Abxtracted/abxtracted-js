var sinon = require('sinon');
var expect = require('chai').expect;
var XMLHttpRequestMock = require('./xml-http-request-mock');
var http = require('../src/http');

describe('Http', function(){

  var MOCK_URL = 'http://api.abxtracted.com/endpoint';
  var mockParams,
    stubXMLHttpRequestOpen,
    stubXMLHttpRequestSend,
    spyHttpComplete;

  beforeEach(function(){
    mockParams = {
      success: sinon.stub(),
      error: sinon.stub()
    };
    global.XMLHttpRequest = XMLHttpRequestMock;
    stubXMLHttpRequestOpen = sinon.stub(global.XMLHttpRequest.prototype, 'open');
    stubXMLHttpRequestSend = sinon.stub(global.XMLHttpRequest.prototype, 'send');
    spyHttpComplete = sinon.spy(http, 'complete');
  });

  afterEach(function(){
    http.complete.restore();
    stubXMLHttpRequestOpen.restore();
    stubXMLHttpRequestSend.restore();
    delete global.XMLHttpRequest;
  });

  it('should return the request instance on get', function(){
    var xhr = http.get(MOCK_URL, mockParams);
    expect(xhr).to.be.defined;
  });

  it('should execute a get request', function(){
    http.get(MOCK_URL, mockParams);
    expect(stubXMLHttpRequestOpen.firstCall.args[0]).to.equal('GET');
    expect(stubXMLHttpRequestOpen.firstCall.args[1]).to.equal(MOCK_URL);
    expect(stubXMLHttpRequestOpen.firstCall.args[2]).to.equal(true);
    expect(stubXMLHttpRequestSend.firstCall.args[0]).to.equal(null);
  })

  it('should call success callback on get success', function(){
    var xhr = http.get(MOCK_URL, mockParams);
    xhr.readyState = 4;
    xhr.status = 200;
    xhr.responseText = '{"scenario":"variation"}';
    xhr.onload();

    expect(mockParams.success.firstCall.args[0].scenario).to.equal('variation');
  });

  it('should call success callback even if server returns blank response', function(){
    var xhr = http.get(MOCK_URL, mockParams);
    xhr.readyState = 4;
    xhr.status = 200;
    xhr.responseText = '';
    xhr.onload();

    expect(mockParams.success.firstCall.args[0]).to.equal('');
  });

  it('should not call success callback on get success if success callback is not given', function(){
    delete mockParams.success;
    var xhr = http.get(MOCK_URL, mockParams);
    xhr.readyState = 4;
    xhr.status = 200;
    xhr.onload();

    expect(spyHttpComplete.called).to.equal(false);
  });

  it('should not execute any callback until request get completed', function(){
    var xhr = http.get(MOCK_URL, mockParams);
    xhr.readyState = 1;
    xhr.onload();

    expect(spyHttpComplete.called).to.equal(false);
  });

  it('should call error callback on get error', function(){
    var errorMessage = 'Bad request';
    var xhr = http.get(MOCK_URL, mockParams);
    xhr.readyState = 4;
    xhr.status = 400;
    xhr.statusText = errorMessage;
    xhr.onload();

    expect(mockParams.error.firstCall.args[0]).to.equal(errorMessage);
  });

  it('should not call error callback on get error if error callback is not given', function(){
    delete mockParams.error;
    var xhr = http.get(MOCK_URL, mockParams);
    xhr.readyState = 4;
    xhr.status = 400;
    xhr.onload();

    expect(spyHttpComplete.called).to.equal(false);
  });

  it('should not call any callback on get complete if params is not given', function(){
    var xhr = http.get(MOCK_URL);
    xhr.readyState = 4;
    xhr.status = 200;
    xhr.onload();

    expect(spyHttpComplete.called).to.equal(false);
  });

});
