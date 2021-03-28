import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('./todos/todos.module').then((m) => m.TodosModule),
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
