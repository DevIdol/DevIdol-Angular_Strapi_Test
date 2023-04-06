import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    strapiURL = environment.mainUrl;

    constructor(private http: HttpClient, private authService: AuthService) { }

    //Create Employee
    public createEmployee(
        formData: FormData,
        uploadProfile: FormData
    ): Observable<any> {
        const token = this.authService.isAuth();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        if (uploadProfile.has('files')) {
            return this.http
                .post(`${this.strapiURL}/upload`, uploadProfile, { headers })
                .pipe(
                    mergeMap((profile: any) => {
                        formData.append('profile', profile[0].id);
                        return this.http.post(
                            `${this.strapiURL}/users?populate=*`,
                            formData,
                            { headers }
                        );
                    })
                );
        } else {
            return this.http.post(`${this.strapiURL}/users`, formData, { headers });
        }
    }

    //Update Employee
    public updateEmployee(
        id: number,
        formData: FormData,
        updateProfile: FormData
    ): Observable<any> {
        const token = this.authService.isAuth();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        if (updateProfile.has('files')) {
            return this.http
                .post(`${this.strapiURL}/upload`, updateProfile, { headers })
                .pipe(
                    mergeMap((profile: any) => {
                        formData?.append('profile', profile[0].id);
                        return this.http.put(
                            `${this.strapiURL}/users/${id}?populate=*`,
                            formData,
                            { headers }
                        );
                    })
                );
        } else {
            return this.http.put(`${this.strapiURL}/users/${id}`, formData, {
                headers,
            });
        }
    }

    //Get All Employees
    public getEmployees(): Observable<any> {
        const token = this.authService.isAuth();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.strapiURL}/users?populate=*`, { headers });
    }

    //Get Employee
    public getEmployee(id: number): Observable<any> {
        const token = this.authService.isAuth();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.strapiURL}/users/${id}?populate=*`, {
            headers,
        });
    }

    //Delete Profile
    public deleteProfile(profileId: number): Observable<any> {
        const token = this.authService.isAuth();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete(`${this.strapiURL}/upload/files/${profileId}`, {
            headers,
        });
    }



    //Change Password
    changePassword(formData: FormData): Observable<any> {
        const token = this.authService.isAuth();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(`${this.strapiURL}/auth/change-password`, formData, {
            headers,
        });
    }

    //Delete Employee
    public deleteEmployee(id: number): Observable<any> {
        const token = this.authService.isAuth();
        const body = { deletedAt: new Date() };
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.put(`${this.strapiURL}/users/${id}`, body, { headers });
    }
}
