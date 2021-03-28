import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { List, Rec, Todo, TodoCreate, TodoUpdate } from '@ng101/mock';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getList() {
    return this.http.get<List<Todo>>('/api/todos');
  }

  create(input: TodoCreate) {
    return this.http.post<Rec<Todo>>('/api/todos', input);
  }

  delete(id: string) {
    return this.http.delete<void>(`/api/todos/${id}`);
  }

  update(id: string, input: TodoUpdate) {
    return this.http.put<void>(`/api/todos/${id}`, input);
  }
}
