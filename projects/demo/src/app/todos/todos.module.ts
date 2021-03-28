import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { MainLayoutModule } from '../layouts/main-layout/main-layout.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () =>
              import('../todo-list/todo-list.module').then(
                (m) => m.TodoListModule
              ),
          },
        ],
      },
    ]),
    MainLayoutModule,
  ],
  exports: [RouterModule],
})
export class TodosModule {}
