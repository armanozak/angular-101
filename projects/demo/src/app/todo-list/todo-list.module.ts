import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoListComponent } from './todo-list.component';
import { MainLayoutModule } from '../layouts/main-layout/main-layout.module';

@NgModule({
  declarations: [TodoListComponent],
  imports: [CommonModule, TodoListRoutingModule, MainLayoutModule],
})
export class TodoListModule {}
