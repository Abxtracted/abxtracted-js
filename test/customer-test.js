var sinon = require('sinon');
var expect = require('chai').expect;
var gcookie = require('gcookie');
var uuid = require('uuid');
var CUSTOMER_ID_COOKIE_KEY = require('../src/constants').customerIdCookieKey;
var customer = require('../src/customer');

describe('Customer', function(){

  var stubGCookieGet,
    stubGCookieSet,
    stubUuidV1;

  beforeEach(function(){
    stubGCookieGet = sinon.stub(gcookie, 'get');
    stubGCookieSet = sinon.stub(gcookie, 'set');
    stubUuidV1 = sinon.stub(uuid, 'v1');
  });

  afterEach(function(){
    stubGCookieGet.restore();
    stubGCookieSet.restore();
    stubUuidV1.restore();
  });

  it('should build customer id with uuid library', function(){
    stubGCookieGet.returns(null);
    var id = customer.buildId();
    expect(stubUuidV1.called).to.equal(true);
  });

  it('should set customer id on cookie right after built it', function(){
    stubUuidV1.returns('123');
    var id = customer.buildId();
    expect(stubGCookieSet.firstCall.args[0]).to.equal(CUSTOMER_ID_COOKIE_KEY);
    expect(stubGCookieSet.firstCall.args[1]).to.equal('123');
    expect(stubGCookieSet.firstCall.args[2]).to.equal(365);
  });

  it('should build customer id', function(){
    stubUuidV1.returns('123');
    stubGCookieGet.returns('123');
    var id = customer.buildId();
    expect(id).to.equal('123');
  });

  it('should not build customer id when set customer id cookie fails', function(){
    stubUuidV1.returns('123');
    stubGCookieGet.returns(null);
    var id = customer.buildId();
    expect(id).to.equal(null);
  });

  it('should not build customer id when customer has already an id on cookie', function(){
    stubUuidV1.returns('456');
    stubGCookieGet.returns('123');
    var id = customer.buildId();
    expect(id).to.equal('123');
  });

  it('should look for customer id on cookie', function(){
    customer.lookForId();
    expect(stubGCookieGet.firstCall.args[0]).to.equal(CUSTOMER_ID_COOKIE_KEY);
  });

});
