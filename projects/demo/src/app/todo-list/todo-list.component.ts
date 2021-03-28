import { Component } from '@angular/core';
import type { Rec, Todo } from '@ng101/mock';
import { merge, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  private listUpdate$ = new Subject<void>();

  list$ = merge(of(0), this.listUpdate$).pipe(
    switchMap(() => this.todo.getList())
  );

  constructor(private todo: TodoService) {}

  toggleDone(todo: Rec<Todo>) {
    this.todo
      .update(todo.id, { title: todo.title, done: !todo.done })
      .subscribe(() => this.listUpdate$.next());
  }
}
