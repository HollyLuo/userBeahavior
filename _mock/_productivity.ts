// tslint:disable
// import * as Mock from 'mockjs';
import { format } from 'date-fns';
import { deepCopy } from '@delon/util';

// region: mock data

const effectiveActiveTime = {
  name: ['HL79200', 'XL79200', 'YL79200'],
  time: [2, 3, 4]
};

// const effectiveActiveTime = []
// const radarData: any[] = [];

// endregion

export const PRODUCTIVITY = {
  '/productivity': JSON.parse(
    JSON.stringify({
      // visitData,
      // visitData2,
      effectiveActiveTime,
      // searchData,
      // offlineData,
      // offlineChartData,
      // salesTypeData,
      // salesTypeDataOnline,
      // salesTypeDataOffline,
      // radarData,
    }),
  ),
  // '/chart/visit': JSON.parse(JSON.stringify(visitData)),
  // '/chart/tags': Mock.mock({
  //   'list|100': [{ x: '@city', 'value|1-100': 150, 'category|0-2': 1 }],
  // }),
};
