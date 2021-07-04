import { TestBed } from '@angular/core/testing';

import { InAuthGuardGuard } from './in-auth-guard.guard';

describe('InAuthGuardGuard', () => {
  let guard: InAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
