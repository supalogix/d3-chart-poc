"use strict";

var d3 = require("d3");
var style = require("./style/style");
var ChartProperties = require("./util/chartProperties");

module.exports = function(el, prop, data) {
	var chartProperties = new ChartProperties(prop, data);

	//
	// Setup Variables
	//
	var canvasWidth = chartProperties.canvasWidth();
	var canvasHeight = chartProperties.canvasHeight();

	var height = chartProperties.height();
	var width = chartProperties.width();

	var x = chartProperties.xScale();
	var y = chartProperties.yScale();

	var xAxis = chartProperties.xAxis();
	var yAxis = chartProperties.yAxis();

	var enableTransition = prop.enableTransition;
	var duration = prop.duration;

	var margin = chartProperties.margin();

	//
	// Refresh SVG
	//
	var element = d3.select(el)
		.select("svg")
		.attr("width", canvasWidth)
		.attr("height", canvasHeight);

	//
	// Refresh Chart
	//
	var selection = d3.select(el)
		.select("#chart")
		.selectAll(".bar")
		.style(style.bar)
		.attr("x", function(d) { return x(d.label); })
		.attr("width", x.rangeBand())
		.attr("y", function(d) { return y(d.value); })
		.attr("height", function(d) { return height - y(d.value); });

	//
	// Refresh X-axis
	//
	var selection = d3.select(el)
		.select("#x_axis")
		.attr("transform", "translate(0," + height + ")")	
		.call(xAxis);

	//
	// Refresh Y-axis
	//
	var selection = d3.select(el)
		.select("#y_axis")
		.call(yAxis);
};
