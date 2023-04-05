import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    hide = true;
    isLoading = false;
    errorMessage!: string;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
        if (authService.isAuth()) {
            this.router.navigate(['/dashboard']);
        }
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rememberMe: [false],
        });
    }

    login() {
        this.isLoading = true;
        const email = this.loginForm.get('email')?.value;
        const password = this.loginForm.get('password')?.value;
        const rememberMe = this.loginForm.get('rememberMe')?.value;
        this.authService.login(email, password, rememberMe).subscribe(
            () => {
                this.isLoading = false;
                this.router.navigate(['/dashboard']);
            },
            (error) => {
                const { message } = error.error.error
                this.isLoading = false;
                this.errorMessage = message || "Invalid email or password.";
            }
        );
    }
}
