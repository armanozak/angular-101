import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../todos/todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss'],
})
export class TodoCreateComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private todo: TodoService
  ) {
    this.buildForm();
  }

  goToListView() {
    this.router.navigate(['..']);
  }

  submitForm() {
    if (!this.form.valid) return;

    this.todo.create(this.form.value).subscribe(() => this.goToListView());
  }

  private buildForm(): void {
    this.form = this.fb.group({
      title: [null, Validators.required],
    });
  }
}
