# Slice donut margin for Chartist.js 
This is a simple plugin for Chartist.js that will add margins between slices on donut charts.

## Available options and their defaults values
```javascript
var defaultOptions = {
  sliceMargin: 6
};
```

## Sample usage in Chartist.js

```javascript
var chart = new Chartist.Pie('.ct-chart', {
  labels: [1, 2, 3, 4, 5, 6, 7],
  series: [
    [2, 4, 2, 5, 4, 3, 6]
  ]
}, {
  plugins: [
    Chartist.plugins.ctSliceDonutMargin({
      sliceMargin: 6
    })
  ]
});
```
