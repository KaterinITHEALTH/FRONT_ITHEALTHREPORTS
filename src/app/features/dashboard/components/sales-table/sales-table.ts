import { Component, computed, input, signal } from '@angular/core';
import { SaleResponse } from '@/core';

@Component({
  selector: 'app-sales-table',
  imports: [],
  templateUrl: './sales-table.html',
  styleUrl: './sales-table.scss',
})
export class SalesTable {
  protected readonly Math = Math;

  readonly sales = input<SaleResponse[]>([]);
  readonly isLoading = input<boolean>(false);
  readonly error = input<unknown>(null);

  readonly currentPage = signal<number>(1);
  readonly pageSize = signal<number>(8);

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil((this.sales()?.length || 0) / this.pageSize())),
  );

  readonly paginatedSales = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return (this.sales() || []).slice(start, start + this.pageSize());
  });

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
}
