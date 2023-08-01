import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Classes } from '../../models';

@Component({
  selector: 'app-classes-form-dialog',
  templateUrl: './classes-form-dialog.component.html',
  styleUrls: ['./classes-form-dialog.component.scss']
})
export class ClassesFormDialogComponent {

  dialogTitle: string = '';

  nameControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(10)]);
  turnsControl = new FormControl<string | null>(null, [Validators.required]);
  nameCourseControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(10)]);

  classesForm = new FormGroup({

    name: this.nameControl,
    turns: this.turnsControl,
    nameCourse: this.nameCourseControl,

  });

  constructor(private dialogRef: MatDialogRef<ClassesFormDialogComponent>, @Inject(MAT_DIALOG_DATA) private data?: Classes) {

    if (this.data) {
      this.nameControl.setValue(this.data.name);
      this.turnsControl.setValue(this.data.turns);
      this.nameCourseControl.setValue(this.data.nameCourse);
    }
  }

  ngOnInit() {
    this.dialogTitle = this.data ? 'Editar Clase' : 'Crear Clase';
  }

  onSubmit(): void {
    if (this.classesForm.invalid) {
      this.classesForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.classesForm.value);
    }

  }

}
