define(['./module', 'd3'],
    function(directives) {
      directives.directive('ccZoomableIcicle', [ function() {
        return {
          restrict: 'EA',
          replace: true,
          scope: {
            data: "@",
            onClick: "=",
            width: "=",
            height: "="
          },
          link: function(scope, element, attrs) {
            scope.data = attrs.data;
            var margin = {  top: 0, right: 20, bottom: 30, left: 40},
                width = scope.width || 960,
                height = scope.height || 500;

            var x = d3.scale.linear()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([0, height]);

            var color = d3.scale.category20c();

            scope.$watch('data', function(data){
              d3.json(scope.data, function(error, root) {
                if (error) return console.warn(error);
                rect = rect
                    .data(partition(d3.entries(root)[0]))
                    .enter().append("rect")
                    .attr("x", function(d) { return x(d.x); })
                    .attr("y", function(d) { return y(d.y); })
                    .attr("width", function(d) { return x(d.dx); })
                    .attr("height", function(d) { return y(d.dy); })
                    .attr("fill", function(d) { return color((d.children ? d : d.parent).key); })
                    .on("click", clicked);
              });
            });

            var partition = d3.layout.partition()
                .children(function(d) { return isNaN(d.value) ? d3.entries(d.value) : null; })
                .value(function(d) { return d.value; });

            var svg = d3.select(element[0]).append("svg")
                .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
                .attr("preserveAspectRatio", "xMidYMid");

            var rect = svg.selectAll("rect");

            function clicked(d) {
              x.domain([d.x, d.x + d.dx]);
              y.domain([d.y, 1]).range([d.y ? 20 : 0, height]);

              rect.transition()
                  .duration(750)
                  .attr("x", function(d) { return x(d.x); })
                  .attr("y", function(d) { return y(d.y); })
                  .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
                  .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); });
            }

          // uncomment to view the changing element width in the console as you resize the window
          /*  angular.element(window).on("resize", function() {
              var ele = angular.element(document).find('svg');
              var w = ele[0].offsetWidth;
              console.log(w);
            });   */
          }
        }
      }]);
    });
