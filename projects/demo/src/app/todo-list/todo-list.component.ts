import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type { Rec, Todo } from '@ng101/mock';
import { EMPTY, merge, of, Subject } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @ViewChild('deleteDialog')
  private deleteDialog?: TemplateRef<any>;

  private listUpdate$ = new Subject<void>();

  list$ = merge(of(0), this.listUpdate$).pipe(
    switchMap(() => this.todo.getList())
  );

  constructor(private todo: TodoService, private dialog: MatDialog) {}

  toggleDone(todo: Rec<Todo>) {
    this.todo
      .update(todo.id, { title: todo.title, done: !todo.done })
      .subscribe(() => this.listUpdate$.next());
  }

  deleteRecord(todo: Rec<Todo>) {
    this.dialog
      .open(this.deleteDialog!, { data: todo.title })
      .afterClosed()
      .pipe(
        concatMap((confirmed) =>
          confirmed ? this.todo.delete(todo.id) : EMPTY
        )
      )
      .subscribe(() => this.listUpdate$.next());
  }
}
