import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { UsersService } from '../create-user/shared/services/users/users.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  search: string = '';
  users: User[];
  constructor(private users_service: UsersService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    const response: any = await this.users_service.getUsers();
    this.users = response.data;
  }

  deleteUser(user: User) {
    const { id, first_name, last_name } = user;
    this.users_service.deleteUserForIndex(id).subscribe({
      complete: () => {
        alert(`${first_name} ${last_name} se eliminó con éxito`);
        this.getUsers();
      },
      error: (error) => {
        throwError(error);
      },
    });
  }
}
