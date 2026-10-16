import { convertToParamMap, provideRouter, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  const params = new BehaviorSubject(convertToParamMap({ type: 'chocolats' }));

  beforeEach(async () => {
    params.next(convertToParamMap({ type: 'chocolats' }));
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { paramMap: params, snapshot: { paramMap: params.value } } },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates products and heading when the route category changes', () => {
    expect(component.type()).toBe('chocolats');
    expect(component.cards().every((product) => product.type === 'chocolats')).toBeTrue();
    params.next(convertToParamMap({ type: 'gateaux' }));
    fixture.detectChanges();
    expect(component.type()).toBe('gateaux');
    expect(component.title()).toBe('Nos gâteaux');
    expect(component.cards().length).toBe(5);
    expect(component.cards().every((product) => product.type === 'gateaux')).toBeTrue();
  });
});
