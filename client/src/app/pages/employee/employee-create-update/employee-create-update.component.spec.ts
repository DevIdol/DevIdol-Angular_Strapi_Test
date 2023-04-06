import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCreateUpdateComponent } from './employee-create-update.component';

describe('EmployeeCreateUpdateComponent', () => {
  let component: EmployeeCreateUpdateComponent;
  let fixture: ComponentFixture<EmployeeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
