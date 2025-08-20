import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingCourses } from './upcoming-courses';

describe('UpcomingCourses', () => {
  let component: UpcomingCourses;
  let fixture: ComponentFixture<UpcomingCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
