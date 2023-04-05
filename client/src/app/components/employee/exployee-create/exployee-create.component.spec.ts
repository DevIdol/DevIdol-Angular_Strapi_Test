import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExployeeCreateComponent } from './exployee-create.component';

describe('ExployeeCreateComponent', () => {
  let component: ExployeeCreateComponent;
  let fixture: ComponentFixture<ExployeeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExployeeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExployeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
