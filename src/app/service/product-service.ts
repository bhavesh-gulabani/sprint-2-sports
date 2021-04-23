import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Product } from "../product/product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private adminUrl = 'http://localhost:9898/sports/admin/products';
    private customerUrl = 'http://localhost:9898/sports/customers/products';
    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        const url = this.customerUrl        

        return this.http.get<Product[]>(url)
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getProductsByCategory(category: string) {

      return this.http.get<Product[]>(`${this.customerUrl}/categories/${category}`)
        .pipe(
          tap(data => console.log(JSON.stringify(data))),
          catchError(this.handleError)
      );

    }

    getProduct(id: number): Observable<Product> {
        
        return this.http.get<Product>(`${this.adminUrl}/${id}`)
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    
    addProduct(product: Product): Observable<Product> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        product.id = null;
        return this.http.post<Product>(`${this.adminUrl}`, product, { headers })
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
          }

    deleteProduct(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.adminUrl}/${id}`;
        return this.http.delete<Product>(url, { headers })
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
          );
    }

    updateProduct(product: Product): Observable<Product> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<Product>(this.adminUrl, product, { headers })
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            map(() => product),
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