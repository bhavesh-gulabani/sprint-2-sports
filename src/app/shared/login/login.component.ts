import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService ,private router: Router, private route: ActivatedRoute) { }

  signIn(loginForm: NgForm) {

    if (loginForm && loginForm.valid) {
      const email = loginForm.form.value.email;
      const password = loginForm.form.value.password;
      
      this.authService.login(email, password).subscribe({
        next: token => {
          console.log(token);
          alert('Successfully logged in');

          
          // Check for role and navigate accordingly
          this.route.queryParams.subscribe(params => {
            if(params['role'] === 'admin') {
              // Navigate to admin home page
              this.router.navigate(['/admin/dashboard'], 
              {
                queryParams: { role: 'admin'}
              });      
            } else {
              // Navigate to customer home page
              this.router.navigate(['/welcome']); 
              
            }
            
          });
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
