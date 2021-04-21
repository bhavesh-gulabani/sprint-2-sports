import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Customer } from "../customer/customer";
import { Order } from "../order/Order";

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private baseUrl = 'http://localhost:9898/sports/customers';
    constructor(private http: HttpClient) { }

    getCustomers(): Observable<Customer[]> {
        let url = 'http://localhost:9898/sports/admin/customers'

        return this.http.get<Customer[]>(url)
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getCustomer(id: number): Observable<Customer> {
        let url = 'http://localhost:9898/sports/admin/customers/' + id;
        return this.http.get<Customer>(url)
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getCustomerByEmail(email: string): Observable<Customer> {
      let url = `${this.baseUrl}/${email}`;
      return this.http.get<Customer>(url)
        .pipe(
          tap(data => console.log(JSON.stringify(data))),
          catchError(this.handleError)
      );
    }

    addCustomer(customer: Customer): Observable<Customer> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        customer.id = null;
        return this.http.post<Customer>(`${this.baseUrl}/register`, customer, { headers })
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    deleteCustomer(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<Customer>(url, { headers })
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
          );
    }

    updateCustomer(customer: Customer): Observable<Customer> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<Customer>(this.baseUrl, customer, { headers })
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            map(() => customer),
            catchError(this.handleError)
        );
    }

    getOrders(id: number) :Observable<Order[]> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.baseUrl}/${id}/orders`;
        return this.http.get<Order[]>(url, { headers })
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