import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSkills } from './practice-skills';

describe('PracticeSkills', () => {
  let component: PracticeSkills;
  let fixture: ComponentFixture<PracticeSkills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeSkills]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeSkills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
