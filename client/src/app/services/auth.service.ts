import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  strapiURL = environment.mainUrl;

  constructor(private http: HttpClient) {}

  //Login
  public login(
    email: string,
    password: string,
    rememberMe: boolean
  ): Observable<any> {
    const body = { identifier: email, password };
    return this.http.post(`${this.strapiURL}/auth/local`, body).pipe(
      tap((data: any) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', data.jwt);
      })
    );
  }

  //Is Authentication
  public isAuth() {
    let token = localStorage.getItem('token');
    if (!token) {
      token = sessionStorage.getItem('token');
    }
    return token;
  }

  //Is Admin
  public async isAdmin(): Promise<boolean> {
    const token = this.isAuth();
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

  //Decoded Token
  public decodedToken() {
    const token: any = this.isAuth();
    if (token) {
      const { id }: any = jwt_decode(token);
      return id;
    }
  }

  //Logout
  public logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }
}
