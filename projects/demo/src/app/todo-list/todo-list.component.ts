import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import type { List, Todo } from '@ng101/mock';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<List<Todo>>('/api/todos').subscribe(console.log);
  }
}
