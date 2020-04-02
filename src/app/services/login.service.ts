import { Injectable } from '@angular/core';
import iUser from '../models/iUser';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import User from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(id: string, mdp: string): Observable<User> {
    return this.http.get<iUser[]>('https://jsonplaceholder.typicode.com/users?username=' + id)
        .pipe(
            map(value => {
              if (value.length > 0) {
                return value[0];
              } else {
                throw new Error ('Aucun utilisateur trouvé');
              }
            }),
            map(value => new User(value.id, value.name, value.email))
        );
}
}
