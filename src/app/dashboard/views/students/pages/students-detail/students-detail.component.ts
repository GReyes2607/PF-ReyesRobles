import { Component } from '@angular/core';
import { Student } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { StudentService } from '../../../models/student.service';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styles: [
  ]
})
export class StudentsDetailComponent {
  public studentId?: number;
  public students: Student | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notifier: NotifierService,
    private studentService: StudentService
  ) {

    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.notifier.getError(`${this.activatedRoute.snapshot.params['id']} no es un ID valido!!!`)
      this.router.navigate(['dashboard', 'students']);
    } else {
      this.studentId = Number(this.activatedRoute.snapshot.params['id']);
      this.loadStudent();
    }
  }

  loadStudent(): void {
    if (this.studentId) {
      this.studentService.getStudentById(this.studentId).subscribe({
        next: ((student) => {
          this.students = student
        })
      })
    }
  }
}
