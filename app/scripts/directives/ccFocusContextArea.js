define(['./module', 'd3'],
    function(directives) {
      directives.directive('ccFocusContextArea', [ function() {
        return {
          restrict: 'EA',
          replace: true,
          scope: {
            data: "@",
            onClick: "=",
            width: "=",
            height: "=",
            height2: "="
          },
          link: function(scope, element, attrs) {
            var margin = {top: 10, right: 10, bottom: 100, left: 40},
                margin2 = {top: 430, right: 10, bottom: 20, left: 40},
                width = scope.width || 960 - margin.left - margin.right,
                height = scope.height || 500 - margin.top - margin.bottom,
                height2 = scope.height || 500 - margin2.top - margin2.bottom;

            var parseDate = d3.time.format("%b %Y").parse;

            var x = d3.time.scale().range([0, width]),
                x2 = d3.time.scale().range([0, width]),
                y = d3.scale.linear().range([height, 0]),
                y2 = d3.scale.linear().range([height2, 0]);

            var xAxis = d3.svg.axis().scale(x).orient("bottom"),
                xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
                yAxis = d3.svg.axis().scale(y).orient("left");

            var brush = d3.svg.brush()
                .x(x2)
                .on("brush", brushed);

            var area = d3.svg.area()
                .interpolate("monotone")
                .x(function(d) { return x(d.date); })
                .y0(height)
                .y1(function(d) { return y(d.price); });

            var area2 = d3.svg.area()
                .interpolate("monotone")
                .x(function(d) { return x2(d.date); })
                .y0(height2)
                .y1(function(d) { return y2(d.price); });

            var svg = d3.select(element[0])
                .append("svg")
                .attr("viewBox", "0 0 " + (width) + " " + (height + height2))
                .attr("preserveAspectRatio", "xMidYMid");

            svg.append("defs").append("clipPath")
                .attr("id", "clip")
                .append("rect")
                .attr("width", width)
                .attr("height", height);


            scope.$watch('data', function(data) {
              d3.csv(scope.data, function(error, data) {
                data.forEach(function(d) {
                  d.date = parseDate(d.date);
                  d.price = +d.price;

                });
                if (error) return console.warn(error);
                render(data);
              });
            });

            var focus = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var context = svg.append("g")
                .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

            function render(data) {

               x.domain(d3.extent(data.map(function(d) { return d.date; })));
                y.domain([0, d3.max(data.map(function(d) { return d.price; }))]);
                x2.domain(x.domain());
                y2.domain(y.domain());

                focus.append("path")
                    .datum(data)
                    .attr("clip-path", "url(#clip)")
                    .attr("d", area)
                    .style("fill", "orange")
                    .style("shape-rendering", "crispEdges");

                focus.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .style("fill", "none")
                    .style("stroke", "black")
                    .style("shape-rendering", "crispEdges")
                    .call(xAxis);

                focus.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

                context.append("path")
                    .datum(data)
                    .attr("d", area2)
                    .style("fill", "orange")
                    .style("shape-rendering", "crispEdges");

                context.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height2 + ")")
                    .call(xAxis2);

                context.append("g")
                    .attr("class", "x brush")
                    .call(brush)
                    .selectAll("rect")
                    .attr("y", -6)
                    .attr("height", height2 + 7)
                    .style("stroke", "white")
                    .style("fill-opacity", .125)
                    .style("shape-rendering", "crispEdges");
            }

            function brushed() {
              x.domain(brush.empty() ? x2.domain() : brush.extent());
              focus.select("path").attr("d", area);
              focus.select(".x.axis").call(xAxis);
            }
          }
        }
      }]);
    });
