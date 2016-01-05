"use strict";

var create = require("./src/create");
var update = require("./src/update");
var resize = require("./src/resize");
var remove = require("./src/remove");

module.exports = function() {
	return {
		create: create,
		update: update,
		resize: resize,
		remove: remove,
	};
}
