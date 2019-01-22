import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isFormLoading: boolean;

  constructor(
    private auth: AuthenticationService
  ) { }

  ngOnInit() { }

  async onSubmit(f: NgForm){
    try {
      this.isFormLoading = true;
      const token = await this.auth.login(f.value).toPromise();
      this.isFormLoading = false;
    } catch (error) {
      this.isFormLoading = false;
      Swal.fire({
        position: 'top-end',
        type: 'error',
        title: 'Invalid credentials!',
        showConfirmButton: true,
      });
    }
  }

}
