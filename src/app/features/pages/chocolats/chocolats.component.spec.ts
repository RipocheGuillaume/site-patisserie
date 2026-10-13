import { ComponentFixture, TestBed } from '@angular/core/testing';

import { expect } from '@jest/globals';
import { beforeEach, describe, it } from 'node:test';
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
