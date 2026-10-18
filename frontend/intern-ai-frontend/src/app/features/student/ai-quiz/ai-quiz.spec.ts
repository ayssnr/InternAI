import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiQuiz } from './ai-quiz';

describe('AiQuiz', () => {
  let component: AiQuiz;
  let fixture: ComponentFixture<AiQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiQuiz],
    }).compileComponents();

    fixture = TestBed.createComponent(AiQuiz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
