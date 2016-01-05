"use strict";

var d3 = require("d3");
var style = require("./style/style");
var ChartProperties = require("./util/chartProperties");

module.exports = function(el, prop, data) {
	var chartProperties = new ChartProperties(prop, data);

	//
	// Setup Variables
	//
	var height = chartProperties.height();
	var width = chartProperties.width();

	var x = chartProperties.xScale();
	var y = chartProperties.yScale();

	var xAxis = chartProperties.xAxis();
	var yAxis = chartProperties.yAxis();

	var enableTransition = prop.enableTransition;
	var duration = prop.duration;

	var margin = chartProperties.margin();

	var rootSelection = d3.select(el);

	if( enableTransition )
		rootSelection = rootSelection
			.transition()
			.duration(duration);
	//
	// Refresh X-Axis
	//
	rootSelection
		.select("#x_axis")
		.attr("transform", "translate(0," + height  + ")")	
		.call(xAxis);


	//
	// Refresh Y-Axis
	//
	rootSelection
		.select("#y_axis")
		.call(yAxis);

	//
	// Refresh Chart
	//
	var chartSelection = d3.select(el)
		.select("#chart")
		.selectAll(".bar")
		.data(data);

		//
		// Update Transition
		//
		var update = chartSelection
			.style(style.bar)
			.attr("x", function(d) { return x(d.label); })
			.attr("width", x.rangeBand())
		
		if( enableTransition )
			update = update
				.transition()
				.duration(duration);

		update
			.attr("y", function(d) { return y(d.value); })
			.attr("height", function(d) { return height - y(d.value); })

		//
		// Enter Transition
		//
		chartSelection
			.enter()
			.append("rect")
			.attr("class", "bar");

		//
		// Exit Transition
		//
		var exit = chartSelection.exit();

		if( enableTransition )
			exit = exit
				.transition()
				.duration(duration);

		exit
			.attr("width", 0)
			.remove();

};
