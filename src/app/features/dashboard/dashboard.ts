import { enhanceEchartsOptions, N8nAnalyticsService } from '@/core';
import { Component, computed, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { SalesTable } from './components';

@Component({
  imports: [NgxEchartsDirective, SalesTable],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly n8nAnalyticsService = inject(N8nAnalyticsService);

  private readonly prompt = signal<string | undefined>(undefined);

  readonly analyticsResource = rxResource({
    params: () => this.prompt(),
    stream: ({ params }) => this.n8nAnalyticsService.sendPrompt(params!),
  });

  readonly saleResource = rxResource({
    stream: () => this.n8nAnalyticsService.getData(),
  });

  readonly isChartResponse = computed<boolean>(() => {
    const value = this.analyticsResource.value();
    return !!value && typeof value === 'object' && 'title' in value;
  });

  readonly chartOptions = computed<EChartsOption>(() =>
    enhanceEchartsOptions(this.analyticsResource.value()?.options),
  );

  readonly textAnswer = computed<string>(() => {
    const value = this.analyticsResource.value();
    return typeof value === 'string' ? value : JSON.stringify(value);
  });

  readonly errorMessage = computed<string>(() => {
    const error = this.analyticsResource.error() as HttpErrorResponse | undefined;
    if (!error) return '';
    if (error.status === 0) return 'No se pudo conectar con n8n (revisá tu conexión o la configuración de CORS).';
    return `n8n respondió con error ${error.status}: ${error.error?.message ?? error.message}`;
  });

  onSubmit(prompt: string) {
    if (!prompt.trim()) return;
    this.prompt.set(prompt.trim());
  }
}
