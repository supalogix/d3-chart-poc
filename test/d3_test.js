"use strict";

var expect = require("chai").expect;
var d3Chart = require("../index");
var d3ChartPageObject = require("./page_object/d3ChartPageObject");
var d3UnitTest = require("./util/d3UnitTest");
var gen = require("./util/d3ChartDataGenerator");
var _ = require("underscore");

describe("d3Chart", function() {
	describe("create", function() {
		it("displays no items", function(done) {
			d3UnitTest(function(error, window) {
				//
				// Arrange
				//
				var el = window
					.document
					.querySelector("body");
	
				var props = {
					width: 500,
					height: 500
				};
	
				var data = gen.noData();
	
				var chart = new d3Chart();
	
				//
				// Act
				//
				chart.create(el, props, data);
	
				//
				// Assert
				//
				var page = new d3ChartPageObject(el);

				var xAxisTickLabels = page.xAxisTickLabels();
				var yAxisTickLabels = page.yAxisTickLabels();
				var barsMeta = page.barsMeta();
				var width = page.canvasWidth();
				var height = page.canvasHeight();
	
				expect(xAxisTickLabels).to.deep.equal([]);
				expect(yAxisTickLabels).to.deep.equal([]);
				expect(barsMeta).to.deep.equal([]);
				expect(width).to.equal("500");
				expect(height).to.equal("500");

				done();
			});
		});

		it("displays one item", function(done) {
			d3UnitTest(function(error, window) {
				//
				// Arrange
				//
				var el = window
					.document
					.querySelector("body");

				var props = {
					width: 500,
					height: 500
				};

				var data = gen.oneItem();

				var chart = new d3Chart();

				//
				// Act
				//
				chart.create(el, props, data);

				//
				// Assert
				//
				var page = new d3ChartPageObject(el);

				var xAxisTickLabels = page.xAxisTickLabels();
				var yAxisTickLabels = page.yAxisTickLabels();
				var barsMeta = page.barsMeta();
				var width = page.canvasWidth();
				var height = page.canvasHeight();

				expect(xAxisTickLabels).to.deep.equal(["Item A"]);
				expect(yAxisTickLabels).to.deep.equal([
					"0", "20", "40", 
					"60", "80", "100", 
					"120", "140", "160"]);
				expect(barsMeta.length).to.equal(1);
				expect(width).to.equal("500");
				expect(height).to.equal("500");

				done();
			});
		});

		it("displays many items", function(done) {
			d3UnitTest(function(error, window) {
				//
				// Arrange
				//
				var el = window
					.document
					.querySelector("body");

				var props = {
					width: 500,
					height: 500
				};

				var data = gen.manyItems();

				var chart = new d3Chart();

				//
				// Act
				//
				chart.create(el, props, data);

				//
				// Assert
				//
				var page = new d3ChartPageObject(el);

				var xAxisTickLabels = page.xAxisTickLabels();
				var yAxisTickLabels = page.yAxisTickLabels();
				var barsMeta = page.barsMeta();
				var width = page.canvasWidth();
				var height = page.canvasHeight();

				expect(xAxisTickLabels).to.deep.equal([
					"Item A", "Item B", "Item C", 
					"Item D", "Item E", "Item F"]);
				expect(yAxisTickLabels).to.deep.equal([
					"0", "50", "100", 
					"150", "200", "250", 
					"300", "350", "400", 
					"450", "500"]);
				expect(barsMeta.length).to.equal(6);
				expect(width).to.equal("500");
				expect(height).to.equal("500");

				done();
			});
		});

//
//		@TODO
//
//		it("displays lots of items", function(done) {
//			done();
//		});

//
//		@TODO
//
//		it("handles errors", function(done) {
//			done();
//		});
	});

	describe("update", function() {
		it("removes items", function(done) {
			d3UnitTest(function(error,window) {
				//
				// Arrange
				//
				var el = window
					.document
					.querySelector("body");

				var props = {
					width: 500,
					height: 500
				};

				var data = gen.manyItems();
				var newData = gen.oneItem();

				var chart = new d3Chart();

				//
				// Act
				//
				chart.create(el, props, data);
				chart.update(el, props, newData);

				//
				// Assert
				//
				var page = new d3ChartPageObject(el);

				var xAxisTickLabels = page.xAxisTickLabels();
				var yAxisTickLabels = page.yAxisTickLabels();
				var barsMeta = page.barsMeta();
				var width = page.canvasWidth();
				var height = page.canvasHeight();

				expect(xAxisTickLabels).to.deep.equal(["Item A"]);
				expect(yAxisTickLabels).to.deep.equal([
					"0", "20", "40", 
					"60", "80", "100", 
					"120", "140", "160"]);
				expect(barsMeta.length).to.equal(1);
				expect(width).to.equal("500");
				expect(height).to.equal("500");

				done();
			});
		});

		it("adds items", function(done) {
			d3UnitTest(function(error,window) {
				//
				// Arrange
				//
				var el = window
					.document
					.querySelector("body");

				var props = {
					width: 500,
					height: 500
				};

				var data = gen.oneItem();
				var newData = gen.manyItems();

				var chart = new d3Chart();

				//
				// Act
				//
				chart.create(el, props, data);
				chart.update(el, props, newData);

				//
				// Assert
				//
				var page = new d3ChartPageObject(el);

				var xAxisTickLabels = page.xAxisTickLabels();
				var yAxisTickLabels = page.yAxisTickLabels();
				var barsMeta = page.barsMeta();
				var width = page.canvasWidth();
				var height = page.canvasHeight();

				expect(xAxisTickLabels).to.deep.equal([
					"Item A", "Item B", "Item C", 
					"Item D", "Item E", "Item F"]);
				expect(yAxisTickLabels).to.deep.equal([
					"0", "50", "100", 
					"150", "200", "250", 
					"300", "350", "400", 
					"450", "500"]);
				expect(barsMeta.length).to.equal(6);
				expect(width).to.equal("500");
				expect(height).to.equal("500");

				done();
			});
		});


		it("resizes items", function(done) {
			function generateNewData(data) {
				var newData = data.map(function(d) {
					return _.clone(d);
				});

				newData[0].value = Number(newData[0].value) * 2;

				return newData;
			}

			d3UnitTest(function(error,window) {
				//
				// Arrange
				//
				var el = window
					.document
					.querySelector("body");

				var props = {
					width: 500,
					height: 500
				};

				var data = gen.manyItems();
				var newData = generateNewData(data);


				var chart = new d3Chart();

				//
				// Act
				//
				chart.create(el, props, data);

				var page = new d3ChartPageObject(el);
				var originalBarsMeta = page.barsMeta();

				chart.update(el, props, newData);
				var page = new d3ChartPageObject(el);
				var updatedBarsMeta = page.barsMeta();

				//
				// Assert
				//
				expect(originalBarsMeta[0].height).to.be.lt(
					updatedBarsMeta[0].height);
				expect(originalBarsMeta[1].height).to.equal(
					updatedBarsMeta[1].height);
				expect(originalBarsMeta[2].height).to.equal(
					updatedBarsMeta[2].height);
				expect(originalBarsMeta[3].height).to.equal(
					updatedBarsMeta[3].height);
				expect(originalBarsMeta[4].height).to.equal(
					updatedBarsMeta[4].height);
				expect(originalBarsMeta[5].height).to.equal(
					updatedBarsMeta[5].height);

				done();
			});
		});
	});

	describe("resize", function() {
		it("increases width and height", function(done) {
			d3UnitTest(function(error, window) {
				//
				// Arrange
				//
				var el = window
					.document
					.querySelector("body");
	
				var props = {
					width: 500,
					height: 500
				};

				var newProps = {
					width: 1000,
					height: 1000
				};
	
				var data = gen.manyItems();
	
				var chart = new d3Chart();
	
				//
				// Act
				//
				chart.create(el, props, data);
				chart.resize(el, newProps, data);
	
				//
				// Assert
				//
				var page = new d3ChartPageObject(el);
				var width = page.canvasWidth();
				var height = page.canvasHeight();

				expect(width).to.equal("1000");
				expect(height).to.equal("1000");

				done();
			});
		});

		it("decreases width and height", function(done) {
			d3UnitTest(function(error, window) {
				//
				// Arrange
				//
				var el = window
					.document
					.querySelector("body");
	
				var props = {
					width: 1000,
					height: 1000
				};

				var newProps = {
					width: 500,
					height: 500
				};
	
				var data = gen.manyItems();
	
				var chart = new d3Chart();
	
				//
				// Act
				//
				chart.create(el, props, data);
				chart.resize(el, newProps, data);
	
				//
				// Assert
				//
				var page = new d3ChartPageObject(el);
				var width = page.canvasWidth();
				var height = page.canvasHeight();

				expect(width).to.equal("500");
				expect(height).to.equal("500");

				done();
			});
		});
	});
});
