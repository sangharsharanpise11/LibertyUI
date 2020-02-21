Highcharts.chart('container', {
  chart: {
      type: 'areaspline'
  },
  title: {
      text: undefined
  },
 legend: {
      enabled: false
  },
  xAxis: {
     labels: {
        enabled: false
    },
      plotBands: [{ // visualize the weekend
          from: 4.5,
          to: 6.5,
          color: 'rgba(68, 170, 213, .2)'
      }]
  },
  yAxis: {
      title: {
           text: undefined
      },
      labels: {
        enabled: false
    },
  },
  tooltip: {
      shared: true,
      valueSuffix: ' units'
  },
  credits: {
      enabled: false
  },
  plotOptions: {
      areaspline: {
          fillOpacity: 0.5
      }
  },
  series: [{
      name: 'John',
      data: [3, 4, 3, 5, 4, 10, 12]
  }, {
      name: 'Jane',
      data: [1, 3, 4, 3, 3, 5, 4]
  }]
});
/******************** graph 2 ***************************************/
Highcharts.chart('container1', {
  chart: {
      type: 'spline'
  },
  title: {
      text:undefined
  },

  xAxis: {
    categories: ['2007','','2009','','2011']
  },
  yAxis: {
      title: {
          text: undefined
      },
     max:100,
  },
  tooltip: {
      crosshairs: true,
      shared: true
  },

  series: [{
     
      data: [0,75,15,50,100,65]

  }, {
      
      data: [50,75,30,35,70,80]
  }]
}); 
/********************* graph 3 *******************************/
Highcharts.chart('container2', {
  chart: {
      type: 'column'
  },
  title: {
      text:undefined
  },
  xAxis: {
      categories: ['mon', 'tue','wed', 'thu', 'fri', 'sat','sun']
  },
  yAxis: {
    labels:{
    enabled:false
    },
      title: {
          text: undefined
      }
  },
  tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
      shared: true
  },
  plotOptions: {
      column: {
          stacking: 'percent'
      }
  },
  series: [{
      name: 'John',
      data: [5, 3, 4, 7, 2,6,1]
  }, {
      name: 'Jane',
      data: [2, 2, 3, 2, 1,5,9]
  }]
});
/*********************** graph 3 **********************************************************************/
// Define custom series type for displaying low/med/high values using boxplot as a base
Highcharts.seriesType('lowmedhigh', 'boxplot', {
    keys: ['low', 'median', 'high']
}, {
    // Change point shape to a line with three crossing lines for low/median/high
    // Stroke width is hardcoded to 1 for simplicity
    drawPoints: function () {
        var series = this;
        Highcharts.each(this.points, function (point) {
            var graphic = point.graphic,
                verb = graphic ? 'animate' : 'attr',
                shapeArgs = point.shapeArgs,
                width = shapeArgs.width,
                left = Math.floor(shapeArgs.x) + 0.5,
                right = left + width,
                crispX = left + Math.round(width / 2) + 0.5,
                highPlot = Math.floor(point.highPlot) + 0.5,
                medianPlot = Math.floor(point.medianPlot) + 0.5,
                lowPlot = Math.floor(point.lowPlot) + 0.5 - (point.low === 0 ? 1 : 0); // Sneakily draw low marker even if 0

            if (point.isNull) {
                return;
            }

            if (!graphic) {
                point.graphic = graphic = series.chart.renderer.path('point').add(series.group);
            }

            graphic.attr({
                stroke: point.color || series.color,
                "stroke-width": 1
            });

            graphic[verb]({
                d: [
                    'M', left, highPlot,
                    'H', right,
                    'M', left, medianPlot,
                    'H', right,
                    'M', left, lowPlot,
                    'H', right,
                    'M', crispX, highPlot,
                    'V', lowPlot
                ]
            });
        });
    }
});

// Create chart
var chart = Highcharts.chart('container3', {
    chart: {
        type: 'lowmedhigh'
    },

    title: {
        text: undefined
    },

    xAxis: [{
        labels:{
        enabled:false,
        },
        categories: false,
    }],

    yAxis: {
        title: {
            text: undefined
        },
        min: 0,
        labels:{
        enabled:false,
        },
    },

    responsive: {
        rules: [{
            condition: {
                maxWidth: 550
            },
            chartOptions: {
                xAxis: {
                  
                }
                
            }
        }]
    },

    tooltip:false,

    series: [{
        showInLegend: false, 
        data: [
            [0, 10, 19],
          ]
    }]
});

