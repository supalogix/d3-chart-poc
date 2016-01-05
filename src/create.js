"use strict";

var d3 = require("d3");
var style = require("./style/style");
var ChartProperties = require("./util/chartProperties");

module.exports = function(el, prop, data) {
	var chartProperties = new ChartProperties(prop, data);

	//
	// Setup Variables
	//
	var canvasHeight = chartProperties.canvasHeight();
	var canvasWidth = chartProperties.canvasWidth();

	var height = chartProperties.height();
	var width = chartProperties.width();

	var x = chartProperties.xScale();
	var y = chartProperties.yScale();

	var xAxis = chartProperties.xAxis();
	var yAxis = chartProperties.yAxis();

	var margin = chartProperties.margin();


	//
	// Draw Canvas
	//
	var svg = d3.select(el)
		.append("svg")
			.attr("id", "svg")
			.attr("width", canvasWidth)
			.attr("height", canvasHeight)
		.append("g")
			.attr("id", "chart")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	//
	// Draw X-Axis
	//
	svg.append("g")
		.attr("id", "x_axis")
		.style(style.axis)
		.style(style["axis path"])
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	//
	// Draw Y-Axis
	//
	svg.append("g")
			.attr("id", "y_axis")
		.style(style.axis)
		.style(style["axis path"])
		.call(yAxis);

	//
	// Draw Bar Chart
	//
	svg.selectAll(".bar")
		 .data(data)
	  .enter().append("rect")
		 .attr("class", "bar")
		.style(style.bar)
		 .attr("x", function(d) { return x(d.label); })
		 .attr("width", x.rangeBand())
		 .attr("y", function(d) { return y(d.value); })
		 .attr("height", function(d) { return height - y(d.value); });

}
