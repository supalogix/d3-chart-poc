"use strict";

var jsdom = require("jsdom-no-contextify");

module.exports = function(callback) {
	var htmlStub ='<html><body></body></html>';

	return jsdom.env({
		features: {QuerySelector: true},
		html : htmlStub,
		done: callback
	});
};
