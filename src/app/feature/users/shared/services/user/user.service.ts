import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { LoginService } from '@feature/login/shared/services/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private login_service: LoginService
    ) {
    this.headers = new HttpHeaders();
   }

  list() {
    this.createRequestOptions();
    return this.http.get('https://reqres.in/api/users?page=1', {headers: this.headers});
  }

  create(name: string, job: string) {
    return this.http.post('https://reqres.in/api/users', {name, job}, {headers: this.headers});
  }

  delete(id: number){
    return this.http.delete(`https://reqres.in/api/users/${id}`, {headers: this.headers});
  }

  private createRequestOptions() {
    this.headers.set("Autorizacion", `${this.login_service.token}`);
    this.headers.set("Access-Control-Allow-Origin", '*');
  }
}
