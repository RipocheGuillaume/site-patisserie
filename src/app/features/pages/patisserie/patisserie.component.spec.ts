import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatisserieComponent } from './patisserie.component';
import { expect } from '@jest/globals';
import { beforeEach, describe, it } from 'node:test';


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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
