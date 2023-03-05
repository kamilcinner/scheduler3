import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksBrowseComponent } from './tasks-browse.component';

describe('TasksBrowseComponent', () => {
  let component: TasksBrowseComponent;
  let fixture: ComponentFixture<TasksBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksBrowseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
