import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@feature/users/shared/models/user.model';

@Pipe({
  name: 'filterUserByName',
})
export class FilterUserByNamePipe implements PipeTransform {
  transform(users: User[], search: string){
  if(search.length < 3 ){
    return users;
  }

   const filter = users.filter(user => user.first_name.toLowerCase().includes(search.toLowerCase()));
   return filter;
  }
}
