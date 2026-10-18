import { TestBed } from '@angular/core/testing';
import { DailyLog } from './daily-log';

describe('DailyLog', () => {
  let service: DailyLog;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyLog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
