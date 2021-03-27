import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoListComponent } from './todo-list.component';

@NgModule({
  declarations: [TodoListComponent],
  imports: [CommonModule, TodoListRoutingModule],
})
export class TodoListModule {}
