define(['./module', 'd3'],
    function(directives) {
      directives.directive('ccBar', [function() {
        return {
          restrict: 'EA',
          replace: true,
          scope: {
            data: "=",
            onClick: "=",
            width: "=",
            height: "=",
            duration: '@',
            yaxisPos: "=",
            yaxisName: "="
          },
          link: function($scope, element, attrs) {
            var margin = {top: 20, right: 40, bottom: 30, left: 30};
            var  barHeight = parseInt(attrs.barHeight) || 20;
            var  barPadding = parseInt(attrs.barPadding) || 5;

            // Use the category20() scale function for multicolor support
            var color = d3.scale.category20();

            var w=$scope.width || 960,
                h= $scope.height || 300,
                data = $scope.data;

            var x = d3.scale.linear()
                .range([0, w]);

            var y = d3.scale.linear()
                .range([h, 0]);

            var xScale = d3.scale.linear()
                .domain([0, d3.max(data, function(d) {
                  console.log(d);
                  return d.score;
                })])
                .range([0, w]);

            var yScale = d3.scale.linear()
                .domain([0, d3.max(data)])
                .range([h, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var svg = d3.select(element[0]).append("svg")
                .attr("class", "svg")
                .attr("viewBox", "0 0 " + (w) + " " + (h))
                .attr("width", w - margin.left - margin.right)
                .attr("height", h - margin.top - margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            function chart() {
              svg.selectAll('*').remove();
              var width = d3.select(element[0]).node().offsetWidth,
              // calculate the height
                  height = $scope.data.length * (barHeight + barPadding);
              console.log(width);
              console.log(height);
              svg
                  .attr('height', height)
                .attr('width', width);

              var rect = svg.selectAll("rect").data(data);
              var entering = rect.enter().insert("rect", "line");
              var enteringTrans = entering.transition();
              var exiting = rect.exit();
              var trans = rect.transition();
              var exitingTrans = exiting.transition();

              entering.call(onEnter);
              enteringTrans.call(onEnterTrans);
              trans.call(onTrans);
              exitingTrans.call(onExitTrans);

            }


              //operate on lifecycle selections

              function onEnter() {
                  this.attr("x", function(d, i) {
                    return Math.round(margin.left/2);
                  })
                  .attr('width', 140)
                  .attr('height', barHeight)
                  .attr('y', function(d,i) {
                      return i * (barHeight + barPadding);
                  })
                  .attr('fill', function(d) {
                    return color(d.score);
                  });
              }

              function onEnterTrans() {
                  this.duration(1000)
                      .attr('width', function(d) {
                        return xScale(d.score);
                      });
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + h + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .transition()
                    .duration(1000)
                    .ease("cubic-in-out")
                    .attr("transform", "rotate(-90)")
                    .attr("y", attrs.yaxisPos)
                    .attr("dy", "-2em")
                    .style("text-anchor", "end")
                    .style("font-size", "2em")
                    .text(attrs.yaxisName);
              }

              function onTrans() {
                this.duration(1000)
                    .attr('width', function(d) {
                      return xScale(d.score);
                    });
              }

              function onExitTrans() {
                  this.duration(1000)
                      .attr("x", function(d, i) { return Math.round(margin.left/2); })
                      .remove();
              }

            chart.width = function(newWidth) {
              if (!arguments.length) {
                return w;
              }
              w = newWidth;
              x.range([0, w]);

              svg.attr("width", w);
              return this;
            };

            chart.height = function(newHeight) {
              if (!arguments.length) {
                return h;
              }
              h = newHeight;
              y.rangeRound([0, h]);
              svg.attr("height", h);
              return this;
            };
            chart.width($scope.width || 960);
            chart.height($scope.height || 200);
            chart();




           /* chart.width = function(newWidth) {
              if (!arguments.length) {
                return w;
              }
              w = newWidth;
              x.range([0, w]);

              svg.attr("width", w);
              return this;
            };

            chart.height = function(newHeight) {
              if (!arguments.length) {
                return h;
              }
              h = newHeight;
              y.rangeRound([0, h]);
              svg.attr("height", h);
              return this;
            };
                */
           // chart.width($scope.width || 600);
           // chart.height($scope.height || 200);


          /*
            // var margin = parseInt(attrs.margin) || 20,
            var  barHeight = parseInt(attrs.barHeight) || 20;
            var  barPadding = parseInt(attrs.barPadding) || 5;
            var data = $scope.data;
            console.log($scope.data);
            var margin = { top: 20, right: 80, bottom: 30, left: 50 };
            var w = $scope.width || 960;
            var h = $scope.height || 300;

            var x = d3.scale.linear()
                .range([0, w]);

            var y = d3.scale.linear()
                .range([h, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var svg = d3.select(element[0])
                .append("svg")
                .attr("viewBox", "0 0 " + (w) + " " + (h))
                .attr("width", w - margin.left - margin.right)
                .attr("height", h - margin.top - margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          $scope.$watch('data', function(data) {
              // remove all previous items before render
              svg.selectAll('*').remove();// our custom d3 code
              // If we don't pass any data, return out of the element
              if (!data) return;

              // setup variables
              var width = d3.select(element[0]).node().offsetWidth,
              // calculate the height
                  height = $scope.data.length * (barHeight + barPadding),
              // Use the category20() scale function for multicolor support
                  color = d3.scale.category20(),
              // our xScale
                  xScale = d3.scale.linear()
                      .domain([0, d3.max(data, function(d) {
                        return d.score;
                      })])
                      .range([0, w]);

              // set the height based on the calculations above
              svg.attr('height', height);
              //create the rectangles for the bar chart
              svg.selectAll('rect')
                  .data(data).enter()
                  .append('rect')
                  .attr('height', barHeight)
                  .attr('width', 140)
                  .attr('x', Math.round(margin.left/2))
                  .attr('y', function(d,i) {
                    return i * (barHeight + barPadding);
                  })
                  .attr('fill', function(d) { return color(d.score); })
                  .transition()
                  .duration(1000)
                  .attr('width', function(d) {
                    return xScale(d.score);
                  });
              svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + h + ")")
                  .call(xAxis);

              svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                  .append("text")
                  .transition()
                  .duration(1000)
                  .ease("cubic-in-out")
                  .attr("transform", "rotate(-90)")
                  .attr("y", attrs.yaxisPos)
                  .attr("dy", "-2em")
                  .style("text-anchor", "end")
                  .style("font-size", "2em")
                  .text(attrs.yaxisName);
            });
            d3.select(window).on('resize', resize);

            function redraw() {



              x.range([0, width]);
              d3.select(chart.node()).parentNode)
                  .style('height', (y.rangeExtent()[1] + m.top + m.bottom) + 'px')
                  .style('width', (w + m.left + m.right) + 'px');
            }  */
          //  function d3OnClick(item) {
          //    window.alert("clicked");
          //  }
          }
        }

        //close define
      }]);
    });
