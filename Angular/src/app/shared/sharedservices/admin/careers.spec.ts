import { TestBed } from '@angular/core/testing';

import { Careers } from './careers';

describe('Careers', () => {
  let service: Careers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Careers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
