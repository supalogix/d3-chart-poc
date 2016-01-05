"use strict";

function d3ChartDataGenerator() {
}

d3ChartDataGenerator.noData = function() {
	return [];
}

d3ChartDataGenerator.oneItem = function() {
	return [
		{
			label: "Item A",
			value: 167
		}
	];
}

d3ChartDataGenerator.manyItems = function() {
	return [
		{
			label: "Item A",
			value: 167
		},
		{
			label: "Item B",
			value: 200
		},
		{
			label: "Item C",
			value: 350
		},
		{
			label: "Item D",
			value: 50
		},
		{
			label: "Item E",
			value: 500
		},
		{
			label: "Item F",
			value: 75
		},
	];
}

d3ChartDataGenerator.lotsOfItems = function() {
}

d3ChartDataGenerator.badData = function() {
	return [
		{
			key: "value"
		},
		{
			label: "",
			value: "bad value"
		},
		{
			name: "bad name",
			expense: 1234
		}
	];
}

module.exports = d3ChartDataGenerator;


