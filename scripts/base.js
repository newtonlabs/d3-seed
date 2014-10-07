if (d3.ext === null || typeof(d3.ext) !== 'object') { d3.ext = {}; }

this.d3.ext.base = function() {
  'use strict';

  var my = {};
  var config = {};

  my.accessor = function(accessor, value) {
    if (!arguments.length) { return config; }

    if (value !== undefined) { config[accessor] = value; }

    my[accessor] = function(value) {
      if (!arguments.length) { return config[accessor]; }
      config[accessor] = value;
      return my;
    };

    return my;
  };

  my.setupSVG = function(el, width, height) {
    var svg = d3.select(el);
    svg.selectAll('svg').data([1]).enter()
        .append("svg")
        .attr("width", width )
        .attr("height", height );
    return svg.select('svg');
  };

  my.setupChart = function(svg, margin) {
    svg.selectAll('.chart-box').data([1]).enter()
        .append("g")
        .attr('class', 'chart-box')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    return svg.select('.chart-box');
  };

  my.chartWidth = function(width, margin) {
    return width - margin.left - margin.right;
  };

  my.chartHeight = function(height, margin) {
    return height - margin.top - margin.bottom;
  };

  return my;
};
