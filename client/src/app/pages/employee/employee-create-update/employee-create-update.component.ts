import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { EMPTY } from 'rxjs';
import { Role } from 'src/app/interfaces/interfaces';
import { EmployeeService } from 'src/app/services/employee.service';
import {
  dobValidator,
  passwordMatchValidator,
} from 'src/app/validators/validators';

@Component({
  selector: 'app-employee-create-update',
  templateUrl: './employee-create-update.component.html',
  styleUrls: ['./employee-create-update.component.scss'],
})
export class EmployeeCreateUpdateComponent {
  profileSize = ['large', 'medium', 'small', 'thumbnail'];

  roles: Role[] = [
    { value: 1, label: 'Admin' },
    { value: 2, label: 'Member' },
  ];

  employeeForm!: FormGroup;
  changePasswordForm!: FormGroup;
  createUpdateEmployeeForm!: FormGroup;
  profilePhoto!: File;
  profileImg = '';
  imageName = '';
  hide = true;
  isLoading = false;
  errorMessage!: string;
  employeeId!: number;
  isChangePassword = false;
  isUpdateMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.employeeId = +id;
    this.isUpdateMode = !!id;
    this.setupEmployeeForm();
    this.setupChangePasswordForm();
    this.createUpdateEmployeeForm = this.fb.group({
      employee: this.employeeForm,
      changePassword: this.isUpdateMode && this.changePasswordForm,
    });

    if (this.isUpdateMode) {
      this.employeeService.getEmployee(this.employeeId).subscribe(
        (employee) => {
          this.profileImg = this.profileSize
            .map((key) => employee.profile?.formats?.[key]?.url)
            .find((url: string) => !!url);
          this.imageName = employee.profile?.name;
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

  //Employee Form Validation
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
        !this.isUpdateMode && [Validators.required, Validators.minLength(6)],
      ],
      address: [''],
      phone: ['', [Validators.minLength(8), Validators.maxLength(11)]],
      dob: [, dobValidator],
      role: ['', [Validators.required]],
    });
  }

  //Change Password Form Validation
  private setupChangePasswordForm(): void {
    if (this.isUpdateMode) {
      this.changePasswordForm = this.fb.group(
        {
          currentPassword: ['', [Validators.required]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        },
        { validators: passwordMatchValidator } as AbstractControlOptions
      );
    }
  }

  //Select Profile Image From Device
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profilePhoto = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImg = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  //Show or Hide to change Password
  changePasswordToggle() {
    this.isChangePassword = !this.isChangePassword;
  }

  //Create or Update Employee Submit
  employeeSubmit() {
    this.isLoading = true;
    const { username, email, password, address, phone, dob, role } =
      this.employeeForm.value;
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('role', role);

    if (password) {
      formData.append('password', password);
    }
    if (address) {
      formData.append('address', address);
    }
    if (phone) {
      formData.append('phone', phone);
    }

    if (dob) {
      const dobFormatted = moment(dob).format('YYYY-MM-DD');
      formData.append('dob', dobFormatted);
    }

    const upoloadProfile = new FormData();
    if (this.profilePhoto) {
      upoloadProfile.append('files', this.profilePhoto);
    }

    //Update Employee
    if (this.isUpdateMode) {
      const { changePassword } = this.createUpdateEmployeeForm.value;
      if (changePassword && changePassword.password) {
        formData.append('currentPassword', changePassword.currentPassword);
        formData.append('newPassword', changePassword.password);
        formData.append(
          'passwordConfirmation',
          changePassword.passwordConfirmation
        );
      }
      this.employeeService
        .updateEmployee(this.employeeId, formData, upoloadProfile)
        .subscribe(
          () => {
            this.isLoading = false;
            this.router.navigate(['/employees']);
          },
          (error) => {
            const { message } = error.error.error;
            this.errorMessage = message;
            this.isLoading = false;
          }
        );
    } else {
      //Create Employee
      this.employeeService.createEmployee(formData, upoloadProfile).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/employees']);
        },
        (error) => {
          const { message } = error.error.error;
          this.errorMessage = message;
          this.isLoading = false;
        }
      );
    }
  }
}
