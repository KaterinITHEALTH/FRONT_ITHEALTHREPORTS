import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChartReportResponse } from '../models';

@Service()
export class N8nAnalyticsService {

  getMockBarChart(): Observable<ChartReportResponse> {
    const mock: ChartReportResponse = {
      id: 'report-001',
      title: 'Disponibilidad de Servicios IT Health',
      chartType: 'bar',
      description: 'Reporte semanal de incidentes por módulo',
      options: {
        title: {
          text: 'Incidentes por Módulo IT Health',
          subtext: 'Datos simulados de n8n',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['Urgencias', 'Farmacia', 'Citas', 'Laboratorio', 'Facturación', 'Imágenes'],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Incidentes',
          },
        ],
        series: [
          {
            name: 'Incidentes resueltos',
            type: 'bar',
            barWidth: '50%',
            data: [12, 19, 3, 5, 2, 8],
            itemStyle: {
              color: '#3b82f6',
              borderRadius: [6, 6, 0, 0],
            },
          },
        ],
      },
    };

    return of(mock);
  }
}
