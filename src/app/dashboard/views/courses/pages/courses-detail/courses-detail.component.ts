import { Component } from '@angular/core';
import { Courses } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { CourseService } from '../../../models/courses.service';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styles: [
  ]
})
export class CoursesDetailComponent {
  public coursesId?: number;
  public courses: Courses | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notifier: NotifierService,
    private coursesService: CourseService
  ) {

    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.notifier.getError(`${this.activatedRoute.snapshot.params['id']} no es un ID valido!!!`)
      this.router.navigate(['dashboard', 'courses']);
    } else {
      this.coursesId = Number(this.activatedRoute.snapshot.params['id']);
      this.loadCourse();
    }
  }

  loadCourse(): void {
    if (this.coursesId) {
      this.coursesService.getCoursesById(this.coursesId).subscribe({
        next: ((course) => {
          this.courses = course
        })
      })
    }
  }
}
