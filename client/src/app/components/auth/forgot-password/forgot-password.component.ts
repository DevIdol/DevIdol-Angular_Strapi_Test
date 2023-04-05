import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
    sendMailForm!: FormGroup;
    isLoading = false;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.sendMailForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    sendMail() {
        this.isLoading = true
        setTimeout(() => {
            this.isLoading = false
            console.log(this.sendMailForm.value)
        }, 1000)
    }
}
