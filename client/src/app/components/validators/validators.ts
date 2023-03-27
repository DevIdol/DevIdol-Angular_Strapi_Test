import { FormGroup } from '@angular/forms';

export function passwordMatchValidator(control: FormGroup) {
  const password = control.get('password');
  const cpassword = control.get('confirmPassword');
  if (password && cpassword && password.value !== cpassword.value) {
    cpassword.setErrors({ passwordMismatch: true });
  } else {
    cpassword!.setErrors(null);
  }
}
