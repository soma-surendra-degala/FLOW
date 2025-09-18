import { TestBed } from '@angular/core/testing';

import { AdminAuth } from '../../auth/admin/admin-auth';

describe('AdminAuth', () => {
  let service: AdminAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
