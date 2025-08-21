import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUpcomingCourses } from './student-upcoming-courses';

describe('StudentUpcomingCourses', () => {
  let component: StudentUpcomingCourses;
  let fixture: ComponentFixture<StudentUpcomingCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentUpcomingCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentUpcomingCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
