import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Role } from '../components/interfaces/interfaces';

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

  public async isAdmin(): Promise<boolean> {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      try {
        const user = await this.http
          .get<any>('http://localhost:1337/api/users/me?populate=*', {
            headers,
          })
          .toPromise();
        console.log(user.role);
        return user.role.name === 'Admin';
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    }
    return false;
  }

  public logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }
}
