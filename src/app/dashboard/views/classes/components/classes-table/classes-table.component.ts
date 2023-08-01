import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Classes } from '../../models';

@Component({
  selector: 'app-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss']
})
export class ClassesTableComponent {
  displayedColumns: string[] = ['id', 'name', 'turns', 'nameCourse', 'actions'];

  @Input()
  dataSource: Classes[] = [];

  @Output()
  deleteClasse = new EventEmitter<Classes>();

  @Output()
  editClasse = new EventEmitter<Classes>();

  onDeleteClasses(ClasseToDelete: Classes): void{
    this.deleteClasse.emit(ClasseToDelete);
  }

  onEditClasses(ClasseEdit: Classes): void {
    this.editClasse.emit(ClasseEdit);
  }
}
