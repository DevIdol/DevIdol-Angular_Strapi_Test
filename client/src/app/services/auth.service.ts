import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  public login(
    email: string,
    password: string,
    rememberMe: boolean
  ): Observable<any> {
    const body = { identifier: email, password };
    return this.http.post('http://localhost:1337/api/auth/local', body).pipe(
      tap((data: any) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', data.jwt);
      })
    );
  }

  public isAuthenticated(): boolean {
    let token = localStorage.getItem('token');
    if (!token) {
      token = sessionStorage.getItem('token');
    }
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      console.log(decodedToken);
    }

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    return false;
  }

  public isAdmin(): boolean {
    let token = localStorage.getItem('token');

    if (!token) {
      token = sessionStorage.getItem('token');
    }

    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken.role === 'admin';
    }

    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    return false;
  }

  public logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }
}
