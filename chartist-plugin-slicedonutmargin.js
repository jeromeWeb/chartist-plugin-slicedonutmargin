/**
 * Chartist.js plugin to add margins between slices of a donut.
 *
 */
/* global Chartist */
(function(window, document, Chartist) {
  'use strict';

  var defaultOptions = {
    sliceMargin: 4
  };

  Chartist.plugins = Chartist.plugins || {};
  Chartist.plugins.ctSliceDonutMargin = function(options) {

    options = Chartist.extend({}, defaultOptions, options);

    return function ctSliceDonutMargin(chart) {
      if(chart instanceof Chartist.Pie) {
	      chart.on('draw', function(data) {
  	        if(data.type === 'slice') {

  	        	if (Math.abs(data.startAngle - data.endAngle) < options.sliceMargin)
 	        		{
  	        		return;
 	        		}
  	        	
                  var start = Chartist.polarToCartesian(data.center.x, data.center.y, data.radius, data.startAngle + options.sliceMargin/2),
                  end = Chartist.polarToCartesian(data.center.x, data.center.y, data.radius, data.endAngle - options.sliceMargin/2),
                  arcSweep = data.endAngle - data.startAngle <= 180 ? '0' : '1',
                  d = [
                    // Start at the end point from the cartesian coordinates
                    'M', end.x, end.y,
                    // Draw arc
                    'A', data.radius, data.radius, 0, arcSweep, 0, start.x, start.y
                  ];

                // Create the SVG path
                var path = new Chartist.Svg('path', {
                  d: d.join(' ')
                }, data.element._node.className.baseVal);

                // Adding the pie series value to the path
                path.attr({
                  'value': data.value
                }, Chartist.xmlNs.uri);

                // If this is a donut, we add the stroke-width as style attribute
                  path.attr({
                    'style': 'stroke-width: ' + data.element._node.style.strokeWidth
                  });
                data.element.replace(path);
  	        }
  	      });
      }
    };
  };

}(window, document, Chartist));
