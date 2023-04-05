import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Position } from 'src/app/interfaces/interfaces';
import { EmployeeService } from 'src/app/services/employee.service';
import {
  dobValidator,
  passwordMatchValidator,
} from 'src/app/validators/validators';

@Component({
  selector: 'app-exployee-create',
  templateUrl: './exployee-create.component.html',
  styleUrls: ['./exployee-create.component.scss'],
})
export class ExployeeCreateComponent {
  roles: Position[] = [
    { value: 1, label: 'Admin' },
    { value: 2, label: 'Member' },
  ];

  employeeForm!: FormGroup;
  changePasswordForm!: FormGroup;
  combineEmployeeForm!: FormGroup;
  profilePhoto!: File;
  profileImg = '';
  hide = true;
  isLoading = false;
  errorMessage!: string;
  employeeId!: number;
  isChangePassword = false;
  isUpdate = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.employeeId = +id;
    this.isUpdate = Boolean(id);
    this.setupEmployeeForm();
    this.setupChangePasswordForm();
    this.combineEmployeeForm = this.fb.group({
      employee: this.employeeForm,
      changePassword: this.isUpdate && this.changePasswordForm,
    });

    if (this.isUpdate) {
      this.employeeService.getEmployee(this.employeeId).subscribe(
        (employee) => {
          console.log(employee);
          this.employeeForm.patchValue({
            username: employee.username,
            email: employee.email,
            address: employee.address,
            phone: employee.phone,
            dob: employee.dob,
            role: employee.role.id,
          });

          if (employee.profilePhotoUrl) {
            this.profileImg = employee.profilePhotoUrl;
          }
        },
        (error) => {
          const { message } = error.error.error;
          this.errorMessage = message;
        }
      );
    }
  }

  private setupEmployeeForm(): void {
    this.employeeForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(46),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        !this.isUpdate && [Validators.required, Validators.minLength(6)],
      ],
      address: [],
      phone: [, [Validators.minLength(8), Validators.maxLength(11)]],
      dob: [, dobValidator],
      role: ['', [Validators.required]],
    });
  }

  private setupChangePasswordForm(): void {
    if (this.isUpdate) {
      this.changePasswordForm = this.fb.group(
        {
          currentPassword: ['', [Validators.required]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          passwordConfirmation: [
            '',
            [Validators.required, Validators.minLength(6)],
          ],
        },
        { validators: passwordMatchValidator } as AbstractControlOptions
      );
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImg = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  changePasswordToggle() {
    this.isChangePassword = !this.isChangePassword;
  }

  employeeSubmit() {
    this.isLoading = true;
    const { username, email, password, address, phone, dob, role } = this.employeeForm.value;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('phone', phone);
    if (dob) {
      formData.append('dob', dob);
    }
    formData.append('role', role);

    if (password) {
      formData.append('password', password);
    }
    if (this.profilePhoto) {
      formData.append('profilePhoto', this.profilePhoto);
    }

    if (this.isUpdate) {
      const { changePassword } = this.combineEmployeeForm.value;
      if (changePassword && changePassword.password) {
        formData.append('currentPassword', changePassword.currentPassword);
        formData.append('newPassword', changePassword.password);
        formData.append('passwordConfirmation', changePassword.passwordConfirmation);
      }
      this.employeeService.updateEmployee(this.employeeId, formData).subscribe(
        () => {
          if (changePassword && changePassword.password) {
            this.employeeService.changePassword(formData).subscribe(
              () => {
                this.isLoading = false;
                this.router.navigate(['/employees']);
              },
              (error) => {
                const { message } = error.error;
                this.errorMessage = message;
                this.isLoading = false;
              }
            );
          } else {
            this.isLoading = false;
            this.router.navigate(['/employees']);
          }
        },
        (error) => {
          const { message } = error.error;
          this.errorMessage = message;
          this.isLoading = false;
        }
      );
    } else {
      this.employeeService.createEmployee(formData).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/employees']);
        },
        (error) => {
          const { message } = error.error;
          this.errorMessage = message;
          this.isLoading = false;
        }
      );
    }
  }

}
