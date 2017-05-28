'use strict';

var CUSTOMER_ID_COOKIE_KEY = require('./constants').customerIdCookieKey;
var gcookie = require('gcookie');
var uuid = require('uuid');

var _public = {};

_public.buildId = function(){
  var id = _public.lookForId() || uuid.v1();
  setCustomerIdCookie(id);
  return _public.lookForId();
}

_public.lookForId = function(){
  return getCustomerIdCookie();
};

function setCustomerIdCookie(id){
  gcookie.set(CUSTOMER_ID_COOKIE_KEY, id);
}

function getCustomerIdCookie(){
  return gcookie.get(CUSTOMER_ID_COOKIE_KEY);
}

module.exports = _public;
