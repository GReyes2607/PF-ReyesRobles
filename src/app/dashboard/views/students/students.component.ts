import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Student } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from '../models/student.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  public students: Observable<Student[]>;
  public destroy = new Subject<boolean>();

  constructor(private matDialog: MatDialog, private studentService: StudentService, private notifier: NotifierService) {
    this.studentService.loadStudents();
    this.students = this.studentService.getStudents();

  }

  onCreateStudent(): void {
    this.matDialog.open(StudentFormDialogComponent)
      .afterClosed().subscribe({
        next: (newStudent) => {
          if (newStudent) {
            this.studentService.createStudent({
              name: newStudent.name,
              surname: newStudent.surname,
              email: newStudent.email
            })
          }
        }
      })
  }

  onDeleteStudent(studentDelete: Student): void {
    if (confirm(`¿Esta seguro que desea eleminar a ${studentDelete.name} ${studentDelete.surname} ?`)) {
      this.studentService.deleteStudentById(studentDelete.id);
    }

  }

  onEditStudent(studentEdit: Student): void {
    this.matDialog.open(StudentFormDialogComponent, {
      data: studentEdit
    })
      .afterClosed()
      .subscribe({
        next: (dataEdit) => {
          if (dataEdit) {
            this.studentService.updateStudentById(studentEdit.id, dataEdit)
          }

        }
      })
  }

}
