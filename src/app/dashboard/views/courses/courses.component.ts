import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Courses } from './models';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { CourseService } from '../models/courses.service';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  public courses: Observable<Courses[]>;
  public isLoading$: Observable<boolean>;
  public destroy = new Subject<boolean>();

  constructor(private matDialog: MatDialog, private courseService: CourseService, private notifier: NotifierService) {
    this.courseService.loadCourses();
    this.isLoading$ = courseService.isLoading$;
    this.courses = this.courseService.getCourses();

  }

  onCreateCourse(): void {
    this.matDialog.open(CourseFormDialogComponent)
      .afterClosed().subscribe({
        next: (newCourse) => {
          if (newCourse) {
            this.courseService.createCourse({
              name: newCourse.name,
              type: newCourse.type,
              instructorName: newCourse.instructorName,
            })
          }
        }
      })
  }

  onDeleteCourse(courseDelete: Courses): void {
    if (confirm(`¿Esta seguro que desea eliminar el curso ${courseDelete.name} ?`)) {
      this.courseService.deleteCourseById(courseDelete.id);
    }

  }

  onEditCourse(courseEdit: Courses): void {
    this.matDialog.open(CourseFormDialogComponent, {
      data: courseEdit
    })
      .afterClosed()
      .subscribe({
        next: (dataEdit) => {
          if (dataEdit) {
            this.courseService.updateCourseById(courseEdit.id, dataEdit)
          }

        }
      })
  }

}
