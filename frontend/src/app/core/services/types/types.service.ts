import { Injectable } from '@angular/core';
import typesData from '../../../data/types.json';
import { TypeModel } from '../../interfaces/types.model';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class TypesService extends BaseService<TypeModel> {
  constructor() {
    super();
    this.setItems(typesData);
  }

  selectTypeForHomePage(): TypeModel[] {
    return this.items().slice(0, 3);
  }
}
