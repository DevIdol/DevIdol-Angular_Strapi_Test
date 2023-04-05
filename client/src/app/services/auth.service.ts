import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  strapiURL = environment.mainUrl

  constructor(private http: HttpClient) { }

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

  public isAuth() {
    let token = localStorage.getItem('token')
    if (!token) {
      token = sessionStorage.getItem('token')
    }
    return token
  }

  public logout() {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
  }

}
