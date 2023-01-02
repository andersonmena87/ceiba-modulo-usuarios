import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  /**
  * El nombre de este metodo no debería ser cambiado, pero de ser necesario podrías cambiar la firma
   * */
  public login(email: string, password:string) {
    this.setToken();
  }

  private async setToken(): Promise<void>{
    const token: string = 'QpwL5tke4Pnpja7X4';
    localStorage.setItem('token', token);
  }

  get token(){
    return localStorage.getItem('token');
  }

  private get getToken(): boolean{
    const token = localStorage.getItem('token');
    return token && token !== '' ? true : false;
  }

  getLogged (): boolean{
    return this.getToken;
  }

}
