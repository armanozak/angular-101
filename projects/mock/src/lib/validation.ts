import { TodoCreate, TodoUpdate } from './models';

export function validateTodoCreate(todo: any): asserts todo is TodoCreate {
  if (typeof todo.title === 'string') return;
  throw { status: 400, message: 'invalid todo create' };
}

export function validateTodoUpdate(todo: any): asserts todo is TodoUpdate {
  if (typeof todo.title === 'string' && typeof todo.done === 'boolean') return;
  throw { status: 400, message: 'invalid todo update' };
}
