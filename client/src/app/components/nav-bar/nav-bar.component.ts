import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})

export class NavBarComponent implements OnInit {

    id!: number;

    constructor(public authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.id = this.authService.decodedToken()
    }

    logout() {
        this.router.navigate(["/"])
        return this.authService.logout()
    }
}
