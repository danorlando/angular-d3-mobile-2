define(['./module', 'd3'],
    function(directives) {
      directives.directive('ccParallelCoordinates', [ function() {
        return {
          restrict: 'EA', // Directive Scope is Element
          replace: true, // replace original markup with template
          scope: {
            onClick: "=",
            width: "=",
            height: "=",
            data: "@",  //attr to pass in path to json data file that will be parsed
            yaxisName: "=",
            yaxisPos: "=",
            d3Format: "@"   //pass in a string to tell d3 how to format dates
          },
          link: function(scope, element, attrs) {


            var m = {  top: 20, right: 20, bottom: 30, left: 40},
                w = 960 - m.left - m.right,
                h = 500 - m.top - m.bottom;

            var x = d3.scale.ordinal().rangePoints([0, w], .5),
                y = {};

            var line = d3.svg.line(),
                axis = d3.svg.axis().orient("left"),
                background,
                foreground;

            var svg = d3.select(element[0]).append("svg")
                .attr("viewBox", "0 0 " + (w + m.left + m.right) + " " + (h + m.top + m.bottom))
                .attr("width", w + m.left + m.right)
                .attr("height", h + m.top + m.bottom)
                .append("g")
                .attr("transform", "translate(" + m.left + "," + m.top + ")");

            scope.$watch('data', function(data){
              d3.csv(scope.data, function(error, data) {
                if (error) { return console.warn(error); }
                else {
                  render(data);
                  };
               });
            });

           function render(data) {
              var cities = data;
              // Extract the list of dimensions and create a scale for each.
              x.domain(dimensions = d3.keys(cities[0]).filter(function(d) {
                return d != "City" && (y[d] = d3.scale.linear()
                    .domain(d3.extent(cities, function(p) { return +p[d]; }))
                    .range([h, 0]));
              }));

              // Add grey background lines for context.
              background = svg.append("g")
                  .attr("class", "background")
                  .selectAll("path")
                  .data(cities)
                  .enter().append("path")
                  .attr("d", path)
                  .style("fill", "none")
                  .style("stroke", "#ccc")
                  .style("stroke-opacity", .4)
                  .style("shape-rendering", "crispEdges");

              // Add blue foreground lines for focus.
              foreground = svg.append("g")
                  .attr("class", "foreground")
                  .selectAll("path")
                  .data(cities)
                  .enter().append("path")
                  .attr("d", path)
                  .style("fill", "none")
                  .style("stroke", "green")
                  .style("stroke-opacity", .7);

              // Add a group element for each dimension.
              var g = svg.selectAll(".dimension")
                  .data(dimensions)
                  .enter().append("g")
                  .attr("class", "dimension")
                  .attr("transform", function(d) { return "translate(" + x(d) + ")"; });

              // Add an axis and title.
              g.append("g")
                  .attr("class", "axis")
                  .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
                  .append("text")
                  .attr("text-anchor", "middle")
                  .attr("y", -9)
                  .text(String)
                  .style("text-shadow", "0 1px 0 #fff");

              // Add and store a brush for each axis.
              g.append("g")
                  .attr("class", "brush")
                  .each(function(d) { d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brush", brush)); })
                  .selectAll("rect")
                  .attr("x", -8)
                  .attr("width", 16)
                  .style("fill-opacity",.3)
                 .style("stroke", "#000")
                 .style("shape-rendering", "crispEdges");
             // Returns the path for a given data point.
             function path(d) {
               return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
             }

             // Handles a brush event, toggling the display of foreground lines.
             function brush() {
               var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
                   extents = actives.map(function(p) { return y[p].brush.extent(); });
               foreground.style("display", function(d) {
                 return actives.every(function(p, i) {
                   return extents[i][0] <= d[p] && d[p] <= extents[i][1];
                 }) ? null : "none";
               });
             }
            }


          }
        }
    }]);
 });
