import { TestBed } from '@angular/core/testing';

import { ServiceFirebase } from './firebase.service';

describe('ServiceFirebaseService', () => {
  let service: ServiceFirebase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFirebase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
