import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '@feature/login/shared/services/login/login.service';

/**
 * El nombre de las clases o métodos no se pueden cambiar
 * */
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  headers: any = {};
  constructor(
    private http: HttpClient,
    private login_service: LoginService
  ){
    this.headers = {
      //'Token': this.login_service.token,
      //'Access-Control-Allow-Origin': '*'
    }
  }

  async getUsers() {
    const response = await fetch('https://reqres.in/api/users?page=1')
    .then(response => response.json());
    return response;
  }

  createUser(name: string, job: string) {
    return this.http.post('https://reqres.in/api/users', {name, job}, {headers: this.headers});
  }

  async deleteUserForIndex(index: number) {
    const response = await fetch(`https://reqres.in/api/users/${index}`, {method: 'DELETE'})
    .then(response => response);
    return response?.status == 204 ?  true: false;
  }

}
