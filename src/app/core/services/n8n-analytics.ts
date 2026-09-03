import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ChartReportResponse, ChatRequest, SaleResponse } from '../models';
import { N8N_WEBHOOK_ANALYTICS_URL, N8N_WEBHOOK_DATA_URL } from '../config/n8n.config';

@Injectable({ providedIn: 'root' })
export class N8nAnalyticsService {
  private readonly http = inject(HttpClient);
  
  sendPrompt(prompt: string): Observable<ChartReportResponse> {
    const body: ChatRequest = { prompt };
    return this.http.post<ChartReportResponse>(N8N_WEBHOOK_ANALYTICS_URL, body);
  }

  getData(): Observable<SaleResponse[]>{
    return this.http.get<SaleResponse[]>(N8N_WEBHOOK_DATA_URL);
  }

  getMockData(): Observable<ChartReportResponse> {
    const mock: ChartReportResponse = {
      id: 'report-001',
      title: 'Disponibilidad de Servicios IT Health',
      chartType: 'bar',
      isRenderable: true,
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
