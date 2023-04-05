import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExployeeListComponent } from './exployee-list.component';

describe('ExployeeListComponent', () => {
  let component: ExployeeListComponent;
  let fixture: ComponentFixture<ExployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExployeeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
