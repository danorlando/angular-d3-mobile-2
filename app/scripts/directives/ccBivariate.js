define(['./module', 'd3'],
    function(directives) {
      directives.directive('ccBivariate', [ function() {
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
              link: function(scope, element, attrs) { // the compilation of DOM is done here.
                var margin = {  top: 0, right: 20, bottom: 30, left: 40},
                    width = 960 - margin.left - margin.right ,
                    height = 500 - margin.top - margin.bottom;

                var parseDate = d3.time.format(scope.d3Format).parse;

                var x = d3.time.scale()
                    .range([0, width]);

                var y = d3.scale.linear()
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");

                var area = d3.svg.area()
                    .x(function(d) { return x(d.date); })
                    .y0(function(d) { return y(d.low); })
                    .y1(function(d) { return y(d.high); });

                var svg = d3.select(element[0]).append("svg")
                    .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                scope.$watch('data', function(data){
                  d3.json(scope.data, function(error, data) {
                    data.forEach(function(d) {
                      d.date = parseDate(d.date);
                      d.low = +d.low;
                      d.high = +d.high;
                    });
                    if (error) return console.warn(error);
                    render(data);
                  });
                });

                function render(data) {
                  x.domain(d3.extent(data, function(d) { return d.date; }));
                  y.domain([d3.min(data, function(d) { return d.low; }), d3.max(data, function(d) { return d.high; })]);

                  svg.append("path")
                      .datum(data)
                      .attr("class", "area")
                      .attr("d", area)
                      .style("stroke", "black")
                      .style("fill", "green");

                  svg.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .call(xAxis);

                  svg.append("g")
                      .attr("class", "y axis")
                      .call(yAxis)
                      .append("text")
                      .attr("transform", "rotate(-90)")
                      .attr("y", scope.yaxisPos)
                      .attr("dy", ".71em")
                      .style("text-anchor", "end")
                      .text(scope.yaxisName);
                }
              }
            }
         }]);

      //close define
    });
