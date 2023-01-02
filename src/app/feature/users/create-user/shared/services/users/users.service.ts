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
  headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private login_service: LoginService
  ){
    this.headers = new HttpHeaders();
  }

  async getUsers() {
    this.createRequestOptions();
    const response = await fetch('https://reqres.in/api/users?page=1', {headers: {token: this.login_service.token}})
    .then(response => response.json());
    return response;
  }

  createUser(name: string, job: string) {
    return this.http.post('https://reqres.in/api/users', {name, job}, {headers: this.headers});
  }

  deleteUserForIndex(index: number) {
    return this.http.delete(`https://reqres.in/api/users/${index}`, {headers: this.headers});
  }

  private createRequestOptions() {
    this.headers.set("Autorizacion", `${this.login_service.token}`);
    this.headers.set("Access-Control-Allow-Origin", '*');
  }
}
