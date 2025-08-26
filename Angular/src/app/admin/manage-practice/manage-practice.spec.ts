import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePractice } from './manage-practice';

describe('ManagePractice', () => {
  let component: ManagePractice;
  let fixture: ComponentFixture<ManagePractice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePractice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePractice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
