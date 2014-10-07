if (d3.charts === null || typeof(d3.charts) !== 'object') { d3.charts = {}; }
d3.charts.viz = function () {
  // Functional inheritence of common areas
  var my = d3.ext.base();

  // Define getter/setter style accessors.. defaults assigned
  my.accessor('width', 900)
    .accessor('height', 200)
    .accessor('margin', {top: 10, right: 10, bottom: 10, left: 10});

  // Data for Global Scope
  var chartData = [];
      svg = void 0,
      chart = void 0;

  // Declare D3 functions, also global
  var x = d3.scale.linear(),
      y = d3.scale.ordinal();

  // Example function to create profit.
  my.profit = function(data) {
    return data.map(function(d) {
      d.profit = parseFloat(d.sales) - parseFloat(d.cost);
      return d;
    });
  };

  my.categories = function(data) {
    return data.map(function(d) {
      return d.category;
    });
  };

  my.w = function() {
    return my.chartWidth(my.width(), my.margin());
  };

  my.h = function() {
    return my.chartHeight(my.height(), my.margin());
  };

  my.profitMax = function(data) {
    return d3.max(data, function(d) { return d.profit; });
  };

  // Standard initializor, gets called once on DOM selection
  my.initialize = function(data) {
    // chartData = my.profit(data);
  };

  // main method for drawing the viz
  my.chart = function(data) {
    var chartData = my.profit(data);

    x.domain([0, my.profitMax(chartData)]).range([0,my.w()]);
    y.domain(my.categories(chartData)).rangeRoundBands([0, my.h()], 0.2);

    var boxes = chart.selectAll('.box').data(chartData);

    // Enter
    boxes.enter().append('rect')
        .attr('class', 'box')
        .attr('fill', 'steelblue');

    // Update
    boxes.transition().duration(1000)
        .attr('x', 0)
        .attr('y', function(d) { return y(d.category) })
        .attr('width', function(d) {  return x(d.profit) })
        .attr('height', y.rangeBand())

    // Exit
    boxes.exit().remove();

  };

  // main interface to the vizualization code
  my.draw = function(selection) {
    selection.each(function(data) {
      my.initialize(data);

      // Setup the svg in a reusuable way for adopting to change
      // this code is in scripts/base.js
      svg = my.setupSVG(this, my.width(), my.height());

      // Setup the chart container using a <g> with margins. This
      // pattern is very common in the D3 community
      chart = my.setupChart(svg, my.margin());

      // Creat the visualization
      my.chart(data);
    });
  };

  return my;
}
