(function() {
    var viz = d3.charts.viz().example(false);
    var categories = ['gold', 'white', 'black'];

    var rand = function() {
      return Math.floor((Math.random() * 10) + 1)
    };

    var data = function() {
      return categories.map(function(d,i) {
        var cost = rand();
        var sales = rand();

        return {
          category: 'category-'+i,
          cost: cost,
          sales: cost + sales
        };
      });
    };

    d3.select("#chart").datum(data()).call(viz.draw);

    var id = setInterval(function() {
      d3.select("#chart").datum(data()).call(viz.draw);
    }, 2000);

    setTimeout(function() {
      clearInterval(id);
    }, 10000);

})();