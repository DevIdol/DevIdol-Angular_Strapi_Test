import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent {

    constructor(private authService: AuthService, private router: Router) {
        if (!authService.isAuth()) {
            this.router.navigate(["/"])
        }
    }
}
