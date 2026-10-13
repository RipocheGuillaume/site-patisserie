import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatisserieComponent } from './patisserie.component';


describe('PatisserieComponent', () => {
  let component: PatisserieComponent;
  let fixture: ComponentFixture<PatisserieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatisserieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatisserieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders all patisserie products', () => {
    expect(component.cards().length).toBe(6);
    expect(fixture.nativeElement.querySelectorAll('app-card').length).toBe(6);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
