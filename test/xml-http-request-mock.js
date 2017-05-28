'use strict';

var XMLHttpRequestMock = function(){};
XMLHttpRequestMock.prototype.onload = function(){};
XMLHttpRequestMock.prototype.open = function(){};
XMLHttpRequestMock.prototype.send = function(){};

module.exports = XMLHttpRequestMock;
