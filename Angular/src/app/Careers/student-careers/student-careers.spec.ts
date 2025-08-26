import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCareers } from './student-careers';

describe('StudentCareers', () => {
  let component: StudentCareers;
  let fixture: ComponentFixture<StudentCareers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCareers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCareers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
