import { EChartsOption } from 'echarts';

export interface ChartReportResponse {
  id: string;
  title: string;
  chartType: 'bar' | 'line' | 'pie' | 'radar' | 'custom';
  isRenderable: boolean;
  description?: string;
  suggestion?: string; 
  options: EChartsOption; 
}
