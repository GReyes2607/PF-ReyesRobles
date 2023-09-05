import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.scss']
})
export class CourseTableComponent {

  public isAdmin$: Observable<boolean>;

  constructor(private store: Store) {
    this.isAdmin$ = this.store.select(selectIsAdmin);

  }

  displayedColumns: string[] = ['id', 'name', 'type', 'instructorName', 'actions'];

  @Input()
  dataSource: Course[] = [];

  @Output()
  deleteStudent = new EventEmitter<Course>();

  @Output()
  editStudent = new EventEmitter<Course>();

  onDeleteCourse(CourseToDelete: Course): void{
    this.deleteStudent.emit(CourseToDelete);
  }

  onEditCourse(CourseEdit: Course): void {
    this.editStudent.emit(CourseEdit);
  }
}
