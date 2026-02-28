import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateUserProfileRequest, mapUserProfileFromApi, mapUserProfileListFromApi, UpdateUserProfileRequest, UserProfile } from '../../models/userProfile';


@Injectable({
    providedIn: 'root',
})
export class UserProfileService {
    private baseUrl = `${environment.apiUrl}/UserProfile`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<UserProfile[]> {
        return this.http.get<any[]>(this.baseUrl).pipe(
            map(data => mapUserProfileListFromApi(data))
        );
    }

    getById(id: number): Observable<UserProfile> {
        return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
            map(data => mapUserProfileFromApi(data))
        );
    }

    create(data: CreateUserProfileRequest): Observable<UserProfile> {
        return this.http.post<any>(this.baseUrl, data).pipe(
            map(res => mapUserProfileFromApi(res))
        );
    }

    update(id: number, data: UpdateUserProfileRequest): Observable<UserProfile> {
        return this.http.put<any>(`${this.baseUrl}/${id}`, data).pipe(
            map(res => mapUserProfileFromApi(res))
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
