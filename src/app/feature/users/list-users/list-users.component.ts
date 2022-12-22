import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user/user.service';

@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  search: string = '';
  users: User[];
  constructor(private user_service: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.user_service.list().subscribe({
      next: (response: any) => {
        this.users = response.data;
      },
      error: (error) => {
        throwError(error);
      },
    });
  }

  deleteUser(user: User) {
    const { id, first_name, last_name } = user;
    this.user_service.delete(id).subscribe({
      complete: () => {
        alert(`${first_name} ${last_name} se eliminó con exito`);
        this.getUsers();
      },
      error: (error) => {
        throwError(error);
      },
    });
  }
}
