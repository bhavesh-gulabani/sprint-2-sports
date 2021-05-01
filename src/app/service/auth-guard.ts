import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, CanActivate, Router, RouterStateSnapshot, UrlTree, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  
  constructor(private authService: AuthService,
              private router: Router) {}
  
  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLoggedIn();
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn();
    }

    checkLoggedIn(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/customers', 'login']);
        return false;
    }
}
