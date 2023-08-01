import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Courses } from '../../models';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.scss']
})
export class CourseTableComponent {

  displayedColumns: string[] = ['id', 'name', 'type', 'instructorName', 'actions'];

  @Input()
  dataSource: Courses[] = [];

  @Output()
  deleteStudent = new EventEmitter<Courses>();

  @Output()
  editStudent = new EventEmitter<Courses>();

  onDeleteCourse(CourseToDelete: Courses): void{
    this.deleteStudent.emit(CourseToDelete);
  }

  onEditCourse(CourseEdit: Courses): void {
    this.editStudent.emit(CourseEdit);
  }
}
