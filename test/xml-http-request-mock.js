var XMLHttpRequestMock = function(){
  this.onload = function(){};
  this.open = function(){};
  this.send = function(){};
};

global.XMLHttpRequest = XMLHttpRequestMock;
