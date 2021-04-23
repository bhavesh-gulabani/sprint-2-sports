import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Cart } from "../cart/cart";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private baseUrl = 'http://localhost:9898/sports/customers';
    constructor(private http: HttpClient) { }

    getCart(id: number): Observable<Cart> {
        
        return this.http.get<Cart>(`${this.baseUrl}/${id}/cart`)
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
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