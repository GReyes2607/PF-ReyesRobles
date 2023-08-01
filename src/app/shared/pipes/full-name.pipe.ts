import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/dashboard/views/users/models';

@Pipe({
  name: 'fullName',
})

export class FullNamePipe implements PipeTransform {

  transform(user: User, ...args: unknown[]): unknown {
    const fullName = `${user.name} ${user.surname}`
    return fullName;
  }

}

