import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
let Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/sunburst')(Highcharts);

// import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard-analysis',
  templateUrl: './analysis.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAnalysisComponent implements OnInit {
  // userActiveTimeChart: Chart;

  constructor(private http: _HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.getUserActiveTime();
    this.getDifferentRequestTypeActiveTime();
    this.getDifferentProcessTypeActiveTime();
    this.getDifferentProcessTeamActiveTime();
    this.getBulkActionTimeCompare();
    this.cdr.detectChanges();
  }

  getUserActiveTime() {
    Highcharts.chart('userActiveTime-container', {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: 'User Number and Average Active Time'
      },
      subtitle: {
        text: 'Interval = 10min'
      },
      xAxis: [{
        type: 'datetime',
        categories: [
          '11/05/2018', '11/05/2018', '11/06/2018', '11/07/2018', '11/08/2018', '11/09/2018'
        ],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        min: 50,
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        title: {
          text: 'Count',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        opposite: true
      }, { // Secondary yAxis
        gridLineWidth: 0,
        title: {
          text: 'Time(hh:mm:ss)',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        type: 'datetime',
        dateTimeLabelFormats: {
          second: '%H:%M:%S'
        },
        tooltipValueFormat: '{value:%H:%M:%S}',
        labels: {
          // format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        }
      }],
      tooltip: {
        shared: true
        //pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.formattedValue}</b><br/>'
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
        name: 'User Number',
        type: 'column',
        data: [78, 81, 79, 80, 71],
        tooltip: {
          valueSuffix: ''
        }
      }, {
        name: 'Average Active Time',
        type: 'spline',
        yAxis: 1,
        data: [Date.UTC(1970, 1, 1, 1, 42, 11),
        Date.UTC(1970, 1, 1, 1, 38, 54),
        Date.UTC(1970, 1, 1, 1, 48, 32),
        Date.UTC(1970, 1, 1, 1, 45, 53),
        Date.UTC(1970, 1, 1, 1, 29, 56)],
        tooltip: {
          pointFormat: '{series.name}: <b> {point.y} </b><br/>',
          // valueSuffix: ''

        }

      }]
    });
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
      'name': 'Global World'
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
      'value': 17.84
    },
    {
      'id': '2.2',
      'parent': '1.1',
      'name': 'APAC Custody',
      'value': 8.25
    },
    {
      'id': '2.3',
      'parent': '1.1',
      'name': 'APAC GPU Security',
      'value': 7.94
    },
    {
      'id': '2.4',
      'parent': '1.1',
      'name': 'APAC GPU Pricing',
      'value': 3.55
    },
    /* EMEA */
    {
      'id': '2.5',
      'parent': '1.2',
      'name': 'EMEA Security & Pricing',
      'value': 16.79
    },
    {
      'id': '2.6',
      'parent': '1.2',
      'name': 'EMEA Custody',
      'value': 13.08
    },
    {
      'id': '2.7',
      'parent': '1.2',
      'name': 'EMEA Rates',
      'value': 0.02
    },
    /* NAM */
    {
      'id': '2.8',
      'parent': '1.3',
      'name': 'NAM Security & Pricing',
      'value': 19.80
    },
    {
      'id': '2.9',
      'parent': '1.3',
      'name': 'NAM Custody',
      'value': 5.59
    },
    /* GLOBAL */
    {
      'id': '2.10',
      'parent': '1.4',
      'name': 'GLOBAL SMC Operations',
      'value': 3.77
    },
    {
      'id': '2.11',
      'parent': '1.4',
      'name': 'GLOBAL Security Projects',
      'value': 0.17
    },
    ];
    // Splice in transparent for the center circle
    Highcharts.getOptions().colors.splice(0, 0, 'transparent');
    Highcharts.chart('processTeam-container', {
      chart: {
        height: '100%'
      },
      title: {
        text: 'Different Processing Team'
      },
      // subtitle: {
      //   text: ''
      // },

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
        pointFormat: '<b>{point.name}</b>：<b>{point.value}</b>'
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
        text: 'Different Process Type'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.2f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: 'Process Type',
        colorByPoint: true,
        data: [{
          name: 'Client Individual',
          y: 60.54,
          sliced: true,
          selected: true
        }, {
          name: 'DQ',
          y: 22.98
        }, {
          name: 'Automation Rule',
          y: 16.18
        }, {
          name: 'Outlook Plugin',
          y: 0.27
        }, {
          name: 'Others',
          y: 0.03
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
        text: 'Different Request Type'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.2f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: 'Request Type',
        colorByPoint: true,
        data: [{
          name: 'Securities',
          y: 57.86,
          sliced: true,
          selected: true
        }, {
          name: 'Custody',
          y: 25.72
        }, {
          name: 'GPU',
          y: 11.69
        }, {
          name: 'Event',
          y: 2.93
        }, {
          name: 'Pricing',
          y: 1.79
        }, {
          name: 'Rates',
          y: 0.02
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


}
