import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenGuard } from '@core/guard/token/token.guard';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUsersComponent } from './list-users/list-users.component';

const routes: Routes = [
  { path: 'list',component: ListUsersComponent },
  { path: 'create', component: CreateUserComponent },
  { path: '', redirectTo: '/login' },
  { path: '**', pathMatch: '**', redirectTo: '/users/list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
