import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  /**
  * El nombre de este metodo no debería ser cambiado, pero de ser necesario podrías cambiar la firma
   * */
  public login(email:string, password:string) {
    const token = email+password;
    this.setToken(token);
  }

  private setToken(token: string){
    localStorage.setItem('token', token);
  }

  get token(){
    return localStorage.getItem('token');
  }

  private getToken(){
    const token = localStorage.getItem('token');
    return token && token !== '' ? true : false;
  }

  getLogged(){
    return this.getToken();
  }

}
