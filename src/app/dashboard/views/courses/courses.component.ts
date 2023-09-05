import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Course } from './models';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { CourseService } from '../models/courses.service';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  public courses: Observable<Course[] | null>;
  public isLoading$: Observable<boolean>;
  public destroy = new Subject<boolean>();
  public isAdmin$: Observable<boolean>;

  constructor(private store: Store, private matDialog: MatDialog, private courseService: CourseService, private notifier: NotifierService) {
    this.courseService.loadCourses();
    this.isLoading$ = courseService.isLoading$;
    this.courses = this.courseService.getCourses();
    this.isAdmin$ = this.store.select(selectIsAdmin);

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

  onDeleteCourse(courseDelete: Course): void {
    if (confirm(`¿Esta seguro que desea eliminar el curso ${courseDelete.name} ?`)) {
      this.courseService.deleteCourseById(courseDelete.id);
    }

  }

  onEditCourse(courseEdit: Course): void {
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
