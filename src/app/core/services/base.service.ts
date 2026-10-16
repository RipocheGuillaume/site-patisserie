import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T extends { id: string }> {
  private readonly state = signal<T[]>([]);

  readonly items = this.state.asReadonly();

  readonly count = computed(() => this.state().length);

  protected setItems(items: T[]): void {
    this.state.set(items);
  }

  // Récupérer tous les éléments
  getAll(): T[] {
    return this.items();
  }

  // Récupérer un élément par ID
  getById(id: string): T | undefined {
    return this.items().find((item) => item.id === id);
  }
}
