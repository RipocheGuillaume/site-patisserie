import { ComponentFixture, TestBed } from '@angular/core/testing';

import { beforeEach, describe, it } from 'node:test';
import { TopSectionComponent } from './top-section.component';
import { expect } from '@jest/globals';

describe('TopSectionComponent', () => {
  let component: TopSectionComponent;
  let fixture: ComponentFixture<TopSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
