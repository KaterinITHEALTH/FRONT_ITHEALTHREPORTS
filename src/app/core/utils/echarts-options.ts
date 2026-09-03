import type { EChartsOption } from 'echarts';

/**
 * Normaliza y enriquece las opciones de Apache ECharts recibidas desde el agente de IA.
 *
 * Garantiza:
 * 1. Título visible, centrado y con tipografía consistente (incluido en descargas PNG).
 * 2. Leyenda reubicada abajo con paginación (`type: 'scroll'`) para evitar solapamientos.
 * 3. Caja de herramientas (`toolbox`) con descarga en alta resolución (HD), vista de datos y reset.
 * 4. Márgenes (`grid`) seguros con `containLabel: true` para gráficas cartesianas (barras, líneas).
 *
 * @param options Opciones base generadas por el agente de n8n.
 * @param title Título del reporte (opcional, fallback al título de options o valor por defecto).
 * @returns Opciones completas y blindadas listas para `ngx-echarts`.
 */
export function enhanceEchartsOptions(options?: EChartsOption, title?: string): EChartsOption {
  if (!options) return {};

  const incomingTitle =
    typeof options.title === 'object' && !Array.isArray(options.title) ? options.title : {};

  const incomingLegend =
    typeof options.legend === 'object' && !Array.isArray(options.legend) ? options.legend : {};

  const incomingGrid =
    typeof options.grid === 'object' && !Array.isArray(options.grid) ? options.grid : {};

  const finalTitle = title || (incomingTitle as any)?.text || '';

  return {
    ...options,

    // título
    title: {
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e293b',
      },
      ...incomingTitle,
      show: true,
      text: finalTitle,
      top: 12,
      left: 'center',
    },

    // leyenda
    legend: options.legend
      ? {
          ...incomingLegend,
          top: 'auto',
          bottom: 10,
          left: 'center',
          type: 'scroll',
        }
      : undefined,

    // herramientas
    toolbox: {
      show: true,
      right: '4%',
      top: 10,
      feature: {
        saveAsImage: {
          show: true,
          title: 'Descargar imagen',
          name: finalTitle || 'reporte-grafica',
          pixelRatio: 2,
        },
        dataView: {
          show: true,
          title: 'Ver y copiar datos',
          readOnly: true,
          lang: ['Datos de la Gráfica', 'Cerrar', 'Refrescar'],
        },
        restore: {
          show: true,
          title: 'Restablecer',
        },
      },
      ...(options.toolbox || {}),
    },

    // grid
    grid: {
      ...incomingGrid,
      left: '4%',
      right: '4%',
      top: 70,
      bottom: 55,
      containLabel: true,
    },
  };
}
