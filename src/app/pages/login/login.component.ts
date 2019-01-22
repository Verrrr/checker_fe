import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isFormLoading: boolean;
  hasError: boolean;

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() { }

  async onSubmit(f: NgForm){
    try {
      this.hasError = false;
      this.isFormLoading = true;
      const token = await this.auth.login(f.value).toPromise();
      this.isFormLoading = false;
      localStorage.setItem('token', token['token']);
      this.router.navigateByUrl('/home');
    } catch (error) {
      this.isFormLoading = false;
      this.hasError = true;
    }
  }

}
