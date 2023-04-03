import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from '../../validators/validators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  resetPassForm: FormGroup | any;
  hide = true;
  isAdmin: boolean = false;

  constructor(private fb: FormBuilder, public authService: AuthService) {
    authService.isAdmin().then((admin) => (this.isAdmin = admin));
  }

  ngOnInit() {
    this.resetPassForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: passwordMatchValidator } as AbstractControlOptions
    );
  }

  resetPass() {
    console.log('Email:', this.resetPassForm.value.email);
    console.log('Password:', this.resetPassForm.value.password);
  }
}
