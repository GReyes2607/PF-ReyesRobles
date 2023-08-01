import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

@Component({
  selector: 'app-student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.scss']
})
export class StudentFormDialogComponent {

  dialogTitle: string = '';

  nameControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(3)]);
  surNameControl = new FormControl<string | null>(null, [Validators.required]);
  emailControl = new FormControl<string | null>(null, [Validators.required, Validators.email]);

  studentForm = new FormGroup({

    name: this.nameControl,
    surname: this.surNameControl,
    email: this.emailControl,

  });

  constructor(private dialogRef: MatDialogRef<StudentFormDialogComponent>, @Inject(MAT_DIALOG_DATA) private data?: Student) {

    if (this.data) {
      this.nameControl.setValue(this.data.name);
      this.surNameControl.setValue(this.data.surname);
      this.emailControl.setValue(this.data.email);
    }
  }

  ngOnInit() {
    this.dialogTitle = this.data ? 'Editar Alumno' : 'Crear Alumno';
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.studentForm.value);
    }

  }

}
