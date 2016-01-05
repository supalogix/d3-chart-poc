"use strict";

var d3 = require("d3");

function d3ChartPageObject(el) {
	this.el = el;
}

d3ChartPageObject.prototype.xAxisTickLabels = function() {
	var items = d3.select(this.el)
		.select("#svg")
		.selectAll("#x_axis .tick text")[0]
		.map(function(d) {
			var item = d3.select(d);

			return item.text()
		});

	return items;
};

d3ChartPageObject.prototype.yAxisTickLabels = function() {
	var items = d3.select(this.el)
		.select("#svg")
		.selectAll("#y_axis .tick text")[0]
		.map(function(d) {
			var item = d3.select(d);

			return item.text()
		});

	return items;
};

d3ChartPageObject.prototype.barsMeta = function() {
	var items = d3.select(this.el)
		.select("#chart")
		.selectAll(".bar")[0]
		.map(function(d) {
			var item = d3.select(d);

			var meta = {
				x: item.attr("x"),
				y: item.attr("y"),
				width: item.attr("width"),
				height: item.attr("height")
			};

			return meta;
		});

	return items;
};

d3ChartPageObject.prototype.canvasHeight = function() {
	var height = d3.select(this.el)
		.select("svg")
		.attr("height");

	return height;
};

d3ChartPageObject.prototype.canvasWidth = function() {
	var width = d3.select(this.el)
		.select("svg")
		.attr("width");

	return width;
};

module.exports = d3ChartPageObject;
