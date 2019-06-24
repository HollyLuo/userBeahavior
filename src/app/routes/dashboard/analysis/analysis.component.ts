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
    this.getBulkActionTimeCompare();
    this.getDifferentRequestTypeActiveTime();
    this.getDifferentProcessTypeActiveTime();
    this.getDifferentProcessTeamActiveTime();

    this.cdr.detectChanges();
  }

  getUserActiveTime() {
    Highcharts.chart('userActiveTime-container', {
      chart: {
        zoomType: 'xy'
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            allowOverlap: false,
            inside: true,
            verticalAlign: 'bottom'
          }
        },
        spline: {
          dataLabels: {
            format: '{y:%H:%M:%S}',
            enabled: true,
            allowOverlap: false // 允许数据标签重叠
          }
        }
      },
      title: {
        text: 'User Number and Average Active Time'
      },
      // subtitle: {
      //   text: 'Interval = 10min'
      // },
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
            color: Highcharts.getOptions().colors[0]
          }
        },
        title: {
          text: 'Count',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        opposite: true
      }, { // Secondary yAxis
        gridLineWidth: 0,
        title: {
          text: 'Time(hh:mm:ss)',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        type: 'datetime',
        dateTimeLabelFormats: {
          second: '%H:%M:%S'
        },
        //tooltipValueFormat: '{second :%H:%M:%S}',
        labels: {
          // format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        }
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        x: -80,
        verticalAlign: 'top',
        y: 20,
        floating: true,
        borderWidth: 1,
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
          pointFormat: '<span style="color: {series.color}">\u25CF</span> {series.name}: <b> {point.y:%H:%M:%S} </b><br/>',
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
          format: '{point.name} {point.value:.2f}%',
          filter: {
            property: 'innerArcLength',
            operator: '>',
            value: 16
          }
          // /**
          //        * A custom formatter that returns the name only if the inner arc
          //        * is longer than a certain pixel size, so the shape has place for
          //        * the label.
          //        */
          // formatter: function () {
          //   var shape = this.point.node.shapeArgs;
          //   var innerArcFraction = (shape.end - shape.start) / (2 * Math.PI);
          //   var perimeter = 2 * Math.PI * shape.innerR;
          //   var innerArcPixels = innerArcFraction * perimeter;
          //   if (innerArcPixels > 16) {
          //     return this.point.name;
          //   }
          // }
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
        pointFormat: '<b>{point.name}</b>：<b>{point.value:.2f}%</b>'
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
    Highcharts.chart('bulkAction-container', {
      chart: {
        zoomType: 'xy'
      },
      credits: {
        // enabled: false // 禁用版权信息
        text: 'www.engage.cn'
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: false,
            allowOverlap: false,
            inside: true,

          }
        },
        spline: {
          dataLabels: {
            format: '{y:%H:%M:%S}',
            enabled: true,
            allowOverlap: false // 允许数据标签重叠
          }
        }
      },
      title: {
        text: 'Assign and Bulk Assign Time Compare'
      },
      // subtitle: {
      //   text: 'Interval = 10min'
      // },
      xAxis: [{
        type: 'datetime',
        categories: [
          '11/05/2018', '11/05/2018', '11/06/2018', '11/07/2018', '11/08/2018', '11/09/2018'
        ],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        // min: 400,
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        title: {
          text: 'Count',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        opposite: true
      }, { // Secondary yAxis
        // min:'00:00',
        gridLineWidth: 0,
        title: {
          text: 'Time(hh:mm)',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        type: 'datetime',
        dateTimeLabelFormats: {
          second: '%H:%M:%S'
        },
        // tooltipValueFormat: '{second :%H:%M:%S}',
        labels: {
          format: '{value:%H:%M:%S}',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        }
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        x: -80,
        verticalAlign: 'top',
        y: 20,
        floating: true,
        borderWidth: 1,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'

        // layout: 'vertical',
        // align: 'left',
        // x: 80,
        // verticalAlign: 'top',
        // y: 55,
        // floating: true,
        // backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
      },
      series: [{
        name: 'Count',
        type: 'column',
        data: [590, 616, 586, 610, 429],
        // tooltip: {
        //   valueSuffix: ''
        // }
      },
      {
        name: 'Bulk Assign Time',
        type: 'spline',
        yAxis: 1,
        data: [Date.UTC(1970, 1, 1, 0, 7, 43),
        Date.UTC(1970, 1, 1, 0, 9, 1),
        Date.UTC(1970, 1, 1, 0, 7, 11),
        Date.UTC(1970, 1, 1, 0, 7, 55),
        Date.UTC(1970, 1, 1, 0, 4, 45)],
        tooltip: {
          pointFormat: '<span style="color: {series.color}">\u25CF</span> {series.name}: <b> {point.y:%H:%M:%S} </b><br/>',
          // valueSuffix: ''
        }
      },
      {
        name: 'Normal Assign Time',
        type: 'spline',
        yAxis: 1,
        data: [Date.UTC(1970, 1, 1, 1, 5, 5),
        Date.UTC(1970, 1, 1, 1, 13, 2),
        Date.UTC(1970, 1, 1, 1, 9, 41),
        Date.UTC(1970, 1, 1, 1, 23, 16),
        Date.UTC(1970, 1, 1, 0, 51, 28)],
        tooltip: {
          pointFormat: '<span style="color: {series.color}">\u25CF</span> {series.name}: <b> {point.y:%H:%M:%S} </b><br/>',
          // valueSuffix: ''
        }
      }
      ]
    });

  }

}
