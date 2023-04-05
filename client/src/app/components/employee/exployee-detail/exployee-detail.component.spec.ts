import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExployeeDetailComponent } from './exployee-detail.component';

describe('ExployeeDetailComponent', () => {
  let component: ExployeeDetailComponent;
  let fixture: ComponentFixture<ExployeeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExployeeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExployeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
