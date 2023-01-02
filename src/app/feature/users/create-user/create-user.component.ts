import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { UserService } from '../shared/services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  formGroup: FormGroup;

  name_invalid: boolean = true;
  job_invalid: boolean = true;

  constructor(
    private readonly router: Router,
    private user_service: UserService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      job: new FormControl('', [Validators.required]),
    });
  }

  save() {
    const name = this.formGroup.get('name').value;
    const job = this.formGroup.get('job').value;
    this.user_service.create(name, job).subscribe({
      complete: () => {
        alert(`Usuario ${name} creado con exito`);
        this.redirectToListUsers();
      },
      error: (error) => throwError(error),
    });
  }

  validateInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const field = this.formGroup.get(input.name);
    const invalid = field.hasError('required');

    switch (input.name) {
      case 'name':
        this.name_invalid = invalid;
        break;
      case 'job':
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
