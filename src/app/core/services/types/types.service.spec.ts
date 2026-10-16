import { TestBed } from '@angular/core/testing';

import { TypesService } from './types.service';

describe('TypesService', () => {
  let service: TypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loads categories and selects the first three for home', () => {
    expect(service.count()).toBe(4);
    expect(service.getById('1')?.name).toBe('gateaux');
    expect(service.selectTypeForHomePage().map((type) => type.name))
      .toEqual(['gateaux', 'patisseries', 'chocolats']);
    expect(service.getById('999')).toBeUndefined();
  });
});
