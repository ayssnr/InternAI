import { TestBed } from '@angular/core/testing';
import { Skill } from './skill';

describe('Skill', () => {
  let service: Skill;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Skill);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
