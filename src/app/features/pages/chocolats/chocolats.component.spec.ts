import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocolatsComponent } from './chocolats.component';

describe('ChocolatsComponent', () => {
  let component: ChocolatsComponent;
  let fixture: ComponentFixture<ChocolatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChocolatsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChocolatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders all chocolats products', () => {
    expect(component.cards().length).toBe(4);
    expect(fixture.nativeElement.querySelectorAll('app-card').length).toBe(4);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
