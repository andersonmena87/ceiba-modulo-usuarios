import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { UserService } from '../shared/services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  name: string;
  job: string;

  name_invalid: boolean;
  job_invalid: boolean;

  constructor(
    private readonly router: Router,
    private user_service: UserService
  ) {
  }

ngOnInit(): void {

}

  save(){
    this.user_service.create(this.name, this.job).subscribe({
      complete: () => {
        alert(`Usuario ${this.name} creado con exito`)
        this.redirectToListUsers();
      },
      error: error => throwError(error)
    })
  }

  validateInput(event: Event){
    const input = event.target as HTMLInputElement;
    const invalid = !input.value ? true : false;

    switch (input.name){
      case "name":
        this.name_invalid = invalid;
      break;
      case "job":
        this.job_invalid = invalid;
      break;
    }
  }

  /**
   * Este método no se puede modificar
   * */
  public redirectToListUsers(): void {
    this.router.navigateByUrl('/users/list');
  }
}
