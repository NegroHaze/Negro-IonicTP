import { Injectable } from '@angular/core';
import IUser from '../models/IUser';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(id: string, mdp: string): Observable<IUser[]> {
    return this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
  }
}
