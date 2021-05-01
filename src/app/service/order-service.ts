import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Customer } from "../customer/customer";
import { Order } from "../order/Order";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private baseUrl = 'http://localhost:9898/sports/orders';
    constructor(private http: HttpClient) { }

    getOrders(): Observable<Order[]> {
        
        return this.http.get<Order[]>(this.baseUrl)
          .pipe(
            // tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getOrder(id: number): Observable<Order> {
        
        return this.http.get<Order>(`${this.baseUrl}/${id}`)
          .pipe(
            // tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    addOrder(order: Order, customerId: number): Observable<Order> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        // order.id = null;
        return this.http.post<Order>(`${this.baseUrl}/customer/${customerId}`, order, { headers })
          .pipe(
            // tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    confirmOrder(id: number) {
      return this.http.post<Order>(`${this.baseUrl}/${id}/confirm`, {})
          .pipe(
            // tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    completeOrder(orderId: number, customerId: number, paymentId: number) {
      return this.http.put<Order>(`${this.baseUrl}/${orderId}/customer/${customerId}/payment/${paymentId}/complete`, {})
      .pipe(
        // tap(data => console.log(JSON.stringify(data))),
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