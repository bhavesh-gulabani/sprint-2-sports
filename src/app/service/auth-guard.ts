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
  
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLoggedIn(route.path);
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
        console.log('In canActivate..', state.url)
        return this.checkLoggedIn(state.url);
    }

    checkLoggedIn(url: string): boolean {
        
        if (this.authService.isLoggedIn()) {
            return true;
        }
        // this.authService.redirectUrl = url;
        console.log('Before nav...') 
        this.router.navigate(['/customers', 'login']);
        return false;
    }
}
