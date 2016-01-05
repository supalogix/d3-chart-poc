var d3 = require("d3");
var margin = require("./margin");

function chartProperties(prop, data) {
	this.__prop = prop;
	this.__data = data;

	this.__width = prop.width - margin.left - margin.right;
	this.__height = prop.height - margin.top - margin.bottom;

	this.__canvasWidth = prop.width;
	this.__canvasHeight = prop.height;

	this.__margin = margin;
}

chartProperties.prototype.xScale = function() {
	var data = this.__data;

	var x = d3.scale.ordinal()
		.rangeRoundBands([0, this.width()], .1);

	x.domain(data.map(function(d) { return d.label }));
	
	return x;
};

chartProperties.prototype.yScale = function() {
	var data = this.__data;

	var y = d3.scale.linear()
		.range([this.height(),0]);

	y.domain([0, d3.max(data, function(d){ return d.value; })]);

	return y;
};

chartProperties.prototype.xAxis = function() {
	return d3.svg.axis()
		.scale(this.xScale())
		.orient("bottom");
};

chartProperties.prototype.yAxis = function() {
	return d3.svg.axis()
		.scale(this.yScale())
		.orient("left")
		.ticks(10);
};

chartProperties.prototype.width = function() {
	return this.__width;
};

chartProperties.prototype.height = function() {
	return this.__height;
};

chartProperties.prototype.canvasWidth = function() {
	return this.__canvasWidth;	
};

chartProperties.prototype.canvasHeight = function() {
	return this.__canvasHeight;
};

chartProperties.prototype.margin = function() {
	return this.__margin;
}

module.exports = chartProperties;
