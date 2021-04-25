import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Payment } from "../payment/payment";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private baseUrl = 'http://localhost:9898/sports/payments';
    constructor(private http: HttpClient) { }

    getPayments(): Observable<Payment[]> {
        return this.http.get<Payment[]>(this.baseUrl)
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getPayment(id: number): Observable<Payment> {
        return this.http.get<Payment>(`${this.baseUrl}/${id}`)
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    addPayment(payment: Payment): Observable<Payment> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<Payment>(this.baseUrl, payment, { headers })
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    updatePayment(payment: Payment): Observable<Payment> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<Payment>(this.baseUrl, payment, { headers })
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            map(() => payment),
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