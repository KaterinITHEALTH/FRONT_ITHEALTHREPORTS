import { N8nAnalyticsService } from '@/core';
import { Component, computed, inject, resource } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
  imports: [NgxEchartsDirective],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly n8nAnalyticsService = inject(N8nAnalyticsService);

  readonly analyticsResource = rxResource({
    stream: () => this.n8nAnalyticsService.getMockBarChart(),
  });

  readonly chartOptions = computed(
    () => this.analyticsResource.value()?.options ?? {}
  );

  readonly reportTitle = computed(
    () => this.analyticsResource.value()?.title ?? ''
  );

  onSubmit(){
    //TODO: Implementar método para enviar el prompt al flujo n8n y obtener los datos del reporte
  }


}
