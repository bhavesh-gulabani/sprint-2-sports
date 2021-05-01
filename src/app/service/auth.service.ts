import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Customer } from '../customer/customer';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() getLoggedInStatus: EventEmitter<any> = new EventEmitter();

  private baseUrl = 'http://localhost:9898/sports/users/authenticate';
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Customer> {
    return this.http.post<any>(this.baseUrl, {email, password})
        .pipe(
            map(
                data => {
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('token', 'Bearer ' + data.token);
                    this.getLoggedInStatus.emit(this.isLoggedIn());
                    return data;
                }
            ),
            catchError(this.handleError)
        );
  }

  isLoggedIn() {
    let user = sessionStorage.getItem('email');
    return !(user === null);
  }

  logout(): void {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');
  }

  private handleError(err) {
    
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
