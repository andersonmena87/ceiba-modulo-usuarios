import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login/login.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login_email: string;
  login_password: string;
  login_email_invalid: boolean;
  login_password_invalid: boolean;
  login_password_length_invalid: boolean;
  formGroup: FormGroup;

  constructor(
    private readonly router: Router,
    private login_service: LoginService,
    private formBuilder: FormBuilder
  ) {
    this.login_service = new LoginService();
  }

  ngOnInit(): void {
    if(this.login_service.getLogged()){
      this.redirectUsers();
    }else{
      this.formGroup = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      });
    }
  }

  onLogin(){
    if(this.formGroup.valid){
      this.login_service.login(this.login_email, this.login_password);
      this.redirectUsers();
    }else{
      this.login_email_invalid = this.formGroup.get('email').invalid;
      const password = this.formGroup.get('password');
      this.login_password_invalid = password.hasError('required');
      this.login_password_length_invalid = password.hasError('minlength');
    }

  }

  validateInput(event: Event){
    const input = event.target as HTMLInputElement;
    const invalid = !input.value ? true : false;

    switch (input.name){
      case "email":
        this.login_email_invalid = invalid;
      break;
      case "password":
        this.login_password_invalid = invalid;
        this.login_password_length_invalid = false;
      break;
    }
  }

  /**
   * Este método no se puede modificar
   * */
  public redirectUsers(): void {
    this.router.navigateByUrl('/users/list');
  }

}
