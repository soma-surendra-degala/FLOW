import { TestBed } from '@angular/core/testing';

import { UpcomingCourses } from './upcoming-courses';

describe('UpcomingCourses', () => {
  let service: UpcomingCourses;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpcomingCourses);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
