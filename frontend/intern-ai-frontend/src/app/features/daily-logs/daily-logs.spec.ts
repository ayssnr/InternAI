import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyLogs } from './daily-logs';

describe('DailyLogs', () => {
  let component: DailyLogs;
  let fixture: ComponentFixture<DailyLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyLogs],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyLogs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
