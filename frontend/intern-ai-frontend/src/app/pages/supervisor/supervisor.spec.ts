import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Supervisor } from './supervisor';

describe('Supervisor', () => {
  let component: Supervisor;
  let fixture: ComponentFixture<Supervisor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Supervisor],
    }).compileComponents();

    fixture = TestBed.createComponent(Supervisor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
