import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService ,private router: Router) { }

  signIn(loginForm: NgForm) {

    if (loginForm && loginForm.valid) {
      const email = loginForm.form.value.email;
      const password = loginForm.form.value.password;
      
      this.authService.login(email, password).subscribe({
        next: token => {
          console.log(token);
          alert('Successfully logged in');
          this.router.navigate(['/welcome']);      
        },
        error: err => {
          alert('Invalid credentials');
        }
      });
    }
  }

  ngOnInit() {
  }

}
