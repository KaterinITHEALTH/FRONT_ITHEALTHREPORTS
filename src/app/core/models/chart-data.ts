import { EChartsOption } from 'echarts';

export interface ChartReportResponse {
  id: string;
  title: string;
  chartType: 'bar' | 'line' | 'pie' | 'radar' | 'custom';
  description?: string;
  options: EChartsOption; 
}
