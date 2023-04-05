import { FormControl, FormGroup, ValidationErrors } from '@angular/forms'

//Password Confirmation
export function passwordMatchValidator(control: FormGroup) {
    const password = control.get('password');
    const cpassword = control.get('passwordConfirmation');
    if (password && cpassword && password.value !== cpassword.value) {
        cpassword.setErrors({ passwordMismatch: true });
    } else {
        cpassword!.setErrors(null);
    }
}

//DOB Validator
export function dobValidator(control: FormControl): ValidationErrors | null {
    const dobValue = control.value;
    if (!dobValue) {
        return null;
    }
    const dob = new Date(dobValue);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    if (isNaN(dob.getTime())) {
        return { invalidDate: true };
    }
    if (age < 18 || age >= 120) {
        return { invalidAge: true };
    }
    return null;
}

//Date Format
export const DATE_FORMAT = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    },
};
