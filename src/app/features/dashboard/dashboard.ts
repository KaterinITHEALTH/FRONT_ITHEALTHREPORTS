import { enhanceEchartsOptions, N8nAnalyticsService } from '@/core';
import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';

@Component({
  imports: [NgxEchartsDirective],
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

  onSubmit(prompt: string) {
    if (!prompt.trim()) return;
    this.prompt.set(prompt.trim());
  }
}
