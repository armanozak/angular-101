import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import type { List, Todo } from '@ng101/mock';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  list$ = this.http.get<List<Todo>>('/api/todos');

  constructor(private http: HttpClient) {}
}
