import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Classes } from '../../models';
import { Store } from '@ngrx/store';
import { ClassesActions } from '../../store/classes.actions';
import { Observable } from 'rxjs';
import { Course } from '../../../courses/models';
import { SelectCourseOptions, SelectStudentOptions } from '../../store/classes.selectors';
import { Student } from '../../../students/models';

@Component({
  selector: 'app-classes-form-dialog',
  templateUrl: './classes-form-dialog.component.html',
  styleUrls: ['./classes-form-dialog.component.scss']
})
export class ClassesFormDialogComponent {

  dialogTitle: string = '';

  nameControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(10)]);
  turnsControl = new FormControl<string | null>(null, [Validators.required]);
  courseIdcontrol = new FormControl(0, Validators.required);
  studentIdcontrol = new FormControl(0, Validators.required);

  classesForm = new FormGroup({

    name: this.nameControl,
    turns: this.turnsControl,
    courseId: this.courseIdcontrol,
    studentId: this.studentIdcontrol

  });

  courseOptions$: Observable<Course[]>;
  studentOptions$: Observable<Student[]>;

  constructor(private dialogRef: MatDialogRef<ClassesFormDialogComponent>, private store: Store, @Inject(MAT_DIALOG_DATA) private data?: Classes) {
    this.courseOptions$ = this.store.select(SelectCourseOptions);
    this.studentOptions$ = this.store.select(SelectStudentOptions);

    if (this.data) {
      this.nameControl.setValue(this.data.name);
      this.turnsControl.setValue(this.data.turns);
      this.courseIdcontrol.setValue(this.data.courseId);
      this.studentIdcontrol.setValue(this.data.studentId);
    }
  }

  ngOnInit() {
    this.dialogTitle = this.data ? 'Editar inscripcion' : 'Crear inscripcion';
    this.store.dispatch(ClassesActions.loadCoursesOption());
    this.store.dispatch(ClassesActions.loadStudentsOption());
  }

  onSubmit(): void {
    if (this.classesForm.invalid) {
      this.classesForm.markAllAsTouched();
    } else {
      if (!this.data) {
        this.store.dispatch(ClassesActions.createClasses({ payload: this.classesForm.getRawValue() }));
        this.dialogRef.close();
      } else {
        this.dialogRef.close(this.classesForm.value);
      }
      
    }

  }

}
