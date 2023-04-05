import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControlOptions } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/validators/validators';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent {
    resetPassForm!: FormGroup;
    hide = true;
    confirmHide = true;
    isLoading = false;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.resetPassForm = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        }, { validators: passwordMatchValidator } as AbstractControlOptions);
    }

    login() {
        this.isLoading = true
        setTimeout(() => {
            this.isLoading = false
            console.log(this.resetPassForm.value)
        }, 1000)
    }
}
