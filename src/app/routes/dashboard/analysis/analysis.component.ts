import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
let Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/sunburst')(Highcharts);

// import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard-analysis',
  templateUrl: './analysis.component.html',
})
export class DashboardAnalysisComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() {
    this.getUserActiveTime();
    this.getBulkActionTimeCompare();
    this.getDifferentRequestTypeActiveTime();
    this.getDifferentProcessTypeActiveTime();
    this.getDifferentProcessTeamActiveTime();
  }
  getDifferentProcessTeamActiveTime() {
    Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });
    var data = [{
      'id': '0.0',
      'parent': '',
      'name': 'The World'
    }, {
      'id': '1.1',
      'parent': '0.0',
      'name': 'APAC'
    }, {
      'id': '1.2',
      'parent': '0.0',
      'name': 'EMEA'
    }, {
      'id': '1.3',
      'parent': '0.0',
      'name': 'NAM'
    }, {
      'id': '1.4',
      'parent': '0.0',
      'name': 'GLOBAL'
    },
    /* APAC */
    {
      'id': '2.1',
      'parent': '1.1',
      'name': 'APAC Security & Pricing',
      'value': 1111
    },
    {
      'id': '2.2',
      'parent': '1.1',
      'name': 'APAC Custody',
      'value': 1111
    },
    {
      'id': '2.3',
      'parent': '1.1',
      'name': 'APAC 3',
      'value': 1111
    },
    {
      'id': '2.4',
      'parent': '1.1',
      'name': 'APAC 4',
      'value': 1111
    },
    /* EMEA */
    {
      'id': '2.5',
      'parent': '1.2',
      'name': 'EMEA 1',
      'value': 2222
    },
    {
      'id': '2.6',
      'parent': '1.2',
      'name': 'EMEA 2',
      'value': 2222
    },
    {
      'id': '2.7',
      'parent': '1.2',
      'name': 'EMEA 3',
      'value': 2222
    },
    /* NAM */
    {
      'id': '2.8',
      'parent': '1.3',
      'name': 'NAM 3',
      'value': 2222
    },
    {
      'id': '2.9',
      'parent': '1.3',
      'name': 'NAM 3',
      'value': 1111
    },
    /* GLOBAL */
    {
      'id': '2.10',
      'parent': '1.4',
      'name': 'NAM 3',
      'value': 2222
    },
    {
      'id': '2.11',
      'parent': '1.4',
      'name': 'NAM 3',
      'value': 1111
    },
    ];
    // Splice in transparent for the center circle
    Highcharts.getOptions().colors.splice(0, 0, 'transparent');
    Highcharts.chart('processTeam-container', {
      chart: {
        height: '100%'
      },
      title: {
        text: '2017 世界人口分布'
      },
      subtitle: {
        text: '数据来源： <href="https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)">Wikipedia</a>'
      },
      series: [{
        type: "sunburst",
        data: data,
        allowDrillToNode: true,
        cursor: 'pointer',
        dataLabels: {
          /**
                 * A custom formatter that returns the name only if the inner arc
                 * is longer than a certain pixel size, so the shape has place for
                 * the label.
                 */
          formatter: function () {
            var shape = this.point.node.shapeArgs;
            var innerArcFraction = (shape.end - shape.start) / (2 * Math.PI);
            var perimeter = 2 * Math.PI * shape.innerR;
            var innerArcPixels = innerArcFraction * perimeter;
            if (innerArcPixels > 16) {
              return this.point.name;
            }
          }
        },
        levels: [{
          level: 2,
          colorByPoint: true,
          dataLabels: {
            rotationMode: 'parallel'
          }
        }, {
          level: 3,
          colorVariation: {
            key: 'brightness',
            to: -0.5
          }
        }]
      }],
      tooltip: {
        headerFormat: "",
        pointFormat: '<b>{point.name}</b>的人口数量是：<b>{point.value}</b>'
      }
    });
  }
  getDifferentProcessTypeActiveTime() {
    Highcharts.chart('processType-container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Process Type'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Chrome',
          y: 61.41,
          sliced: true,
          selected: true
        }, {
          name: 'Internet Explorer',
          y: 11.84
        }, {
          name: 'Firefox',
          y: 10.85
        }, {
          name: 'Edge',
          y: 4.67
        }, {
          name: 'Safari',
          y: 4.18
        }, {
          name: 'Sogou Explorer',
          y: 1.64
        }, {
          name: 'Opera',
          y: 1.6
        }, {
          name: 'QQ',
          y: 1.2
        }, {
          name: 'Other',
          y: 2.61
        }]
      }]
    });
  }
  getDifferentRequestTypeActiveTime() {
    Highcharts.chart('requestType-container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: '2018年1月浏览器市场份额'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Chrome',
          y: 61.41,
          sliced: true,
          selected: true
        }, {
          name: 'Internet Explorer',
          y: 11.84
        }, {
          name: 'Firefox',
          y: 10.85
        }, {
          name: 'Edge',
          y: 4.67
        }, {
          name: 'Safari',
          y: 4.18
        }, {
          name: 'Sogou Explorer',
          y: 1.64
        }, {
          name: 'Opera',
          y: 1.6
        }, {
          name: 'QQ',
          y: 1.2
        }, {
          name: 'Other',
          y: 2.61
        }]
      }]
    });
  }
  getBulkActionTimeCompare() {
    Highcharts.chart('userActionTime-container', {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: '东京月平均天气数据'
      },
      subtitle: {
        text: '数据来源: WorldClimate.com'
      },
      xAxis: [{
        categories: [
          '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
        ],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}°C',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        title: {
          text: '温度',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        opposite: true
      }, { // Secondary yAxis
        gridLineWidth: 0,
        title: {
          text: '降雨量',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value} mm',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        }
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 55,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
      },
      series: [{
        name: '降雨量',
        type: 'column',
        yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        tooltip: {
          valueSuffix: ' mm'
        }
      }, {
        name: '降雨量',
        type: 'column',
        yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        tooltip: {
          valueSuffix: ' mm'
        }
      }, {
        name: '温度',
        type: 'spline',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        tooltip: {
          valueSuffix: ' °C'
        }
      }]
    });
  }
  getUserActiveTime() {
    Highcharts.chart('container', {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: '东京月平均天气数据'
      },
      subtitle: {
        text: '数据来源: WorldClimate.com'
      },
      xAxis: [{
        categories: [
          '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
        ],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}°C',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        title: {
          text: '温度',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        opposite: true
      }, { // Secondary yAxis
        gridLineWidth: 0,
        title: {
          text: '降雨量',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value} mm',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        }
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 55,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
      },
      series: [{
        name: '降雨量',
        type: 'column',
        yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        tooltip: {
          valueSuffix: ' mm'
        }
      }, {
        name: '温度',
        type: 'spline',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        tooltip: {
          valueSuffix: ' °C'
        }
      }]
    });
  }

}
