import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
let Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);
// import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-dashboard-productivity',
  templateUrl: './productivity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardProductivityComponent implements OnInit {
  // effectiveActiveTimeChart: Chart;
  // public options: any = {


  // }

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getEffectiveActiveTime();
    this.cdr.detectChanges();
  }
  subscription: Subscription;
  getEffectiveActiveTime() {
    this.subscription = this.http.get('/productivity').subscribe((res: any) => {

      Highcharts.chart('productivity-container', {
        chart: {
          type: 'bar'
        },
        title: {
          text: '各洲不同时间的人口条形图'
        },
        subtitle: {
          text: '数据来源: Wikipedia.org'
        },
        xAxis: {
          categories: res.effectiveActiveTime.name,
          title: {
            text: null
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: '人口总量 (百万)',
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        tooltip: {
          valueSuffix: ' 百万'
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
              allowOverlap: true // 允许数据标签重叠
            }
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
          shadow: true
        },
        series: [{
          name: '1800 年',
          data: res.effectiveActiveTime.time
        }]
      })


    });
  }

}
