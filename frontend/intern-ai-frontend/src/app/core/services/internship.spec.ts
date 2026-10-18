import { TestBed } from '@angular/core/testing';
import { Internship } from './internship';

describe('Internship', () => {
  let service: Internship;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Internship);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
