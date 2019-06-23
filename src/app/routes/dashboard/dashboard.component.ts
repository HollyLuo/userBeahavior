import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  salesData: any[] = new Array(12).fill({}).map((_i, idx) => ({
    x: `${idx + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  }));


  constructor(private http: _HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit() {


  }
}
