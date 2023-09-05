import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models';

@Component({
  selector: 'app-course-form-dialog',
  templateUrl: './course-form-dialog.component.html',
  styleUrls: ['./course-form-dialog.component.scss']
})
export class CourseFormDialogComponent {

  dialogTitle: string = '';

  nameControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(3)]);
  typeControl = new FormControl<string | null>(null, [Validators.required]);
  instructorNameControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(10)]);

  courseForm = new FormGroup({

    name: this.nameControl,
    type: this.typeControl,
    instructorName: this.instructorNameControl,

  });

  constructor(private dialogRef: MatDialogRef<CourseFormDialogComponent>, @Inject(MAT_DIALOG_DATA) private data?: Course) {

    if (this.data) {
      this.nameControl.setValue(this.data.name);
      this.typeControl.setValue(this.data.type);
      this.instructorNameControl.setValue(this.data.instructorName);
    }
  }

  ngOnInit() {
    this.dialogTitle = this.data ? 'Editar Curso' : 'Crear Curso';
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.courseForm.value);
    }

  }

}
