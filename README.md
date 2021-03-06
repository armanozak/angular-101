# Ng101

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.7.

## Log

### How this workspace was generated

```sh
npx @angular/cli new ng101 --directory=angular-101 --package-manager=yarn --strict --create-application=false
```

![How this workspace was generated](images/how-this-workspace-was-generated.gif)

### How demo app was generated

```sh
yarn ng generate application demo --routing --style=scss
```

![How demo app was generated](images/how-demo-app-was-generated.gif)

### What demo app initially looked like

```sh
yarn start --open
```

![What demo app initially looked like](images/what-demo-app-initially-looked-like.gif)

### How Angular Material was added

```sh
yarn ng add @angular/material
```

![How Angular Material was added](images/how-angular-material-was-added.gif)

### How unit tests are run

```sh
yarn test
```

![How unit tests are run](images/how-unit-tests-are-run.gif)

**Note:** Karma was [configured to run on headless Chrome](projects/demo/karma.conf.js#L40). The default setup would open a new Chrome instance.

### How lazy-loaded module was added

```sh
yarn ng g module todo-list --module=app --route=todo-list
```

![How lazy-loaded module was added](images/how-lazy-loaded-module-was-added.gif)

**Note:** `g` is the short alias for `generate`.

### How to generate a layout

```sh
# first create the module
yarn ng g module layouts/main-layout --module=todo-list/todo-list

# then create the component
yarn ng g component layouts/main-layout/main-layout --export --change-detection=OnPush --flat
```

![Main layout before theming](images/main-layout-before-theming.png)

**Note 1:** [Configured todo list routing](projects/demo/src/app/todo-list/todo-list-routing.module.ts) to have nested routes.

**Note 2:** Obviously, [some styles](projects/demo/src/app/layouts/main-layout/main-layout.component.scss) as well as [Material components](projects/demo/src/app/layouts/main-layout/main-layout.component.html) were used to get that result.

### How to customize Material theme

```scss
@import "~@angular/material/theming";

$app-primary: mat-palette($mat-blue-grey, 900);
$app-accent: mat-palette($mat-yellow, 700);
$app-warn: mat-palette($mat-red, 600);
$app-theme: mat-light-theme(
  (
    color: (
      primary: $app-primary,
      accent: $app-accent,
      warn: $app-warn,
    ),
  )
);
```

![Main layout after theming](images/main-layout-after-theming.gif)

**Note 1:** Material has [over 900 free icons](https://fonts.google.com/icons?selected=Material+Icons) and, when required, [custom icons can be registered](projects/demo/src/app/layouts/main-layout/main-layout.component.ts) via a service.

**Note 2:** Angular protects us against XSS attacks. Custom SVG source could be registered only after [explicit trust was granted](projects/demo/src/app/layouts/main-layout/main-layout.component.ts).

### How linter is run

```sh
yarn lint
```

![How to run linter](images/how-to-run-linter.gif)

**Note:** TS Lint is deprecated and is expected to be replaced by Angular team.

### How mock library was generated

**Important:** This step is not needed when developing Angular apps with a backend.

```sh
yarn ng g library mock --entry-file=index --skip-package-json
```

![How mock library was generated](images/how-mock-library-was-generated.gif)

### How MSW and PouchDB were integrated

**Important:** This step is not needed when developing Angular apps with a backend.

1. Installed [dependencies](package.json).
2. Added pouchdb to [script injected by Angular](angular.json#L39) when app is built.
3. Used MSW CLI to create [mockServiceWorker.js](projects/demo/src/mockServiceWorker.js) and [added the generated file to assets](angular.json#L32).
4. Created [models and request handlers](projects/mock/src/lib).
5. Initiated msw [only in development](projects/demo/src/environments/environment.ts).

![How mock requests work](images/how-mock-requests-work.gif)

**Note:** Using MSW is a personal preference. There are other mocking options such as [Angular in-memory-web-api](https://github.com/angular/angular/tree/master/packages/misc/angular-in-memory-web-api) or providing mock services with dependency injection.

### How AsyncPipe, ngIf, nfFor, and ngClass works

```html
<mat-card>
  <mat-selection-list *ngIf="list$ | async as list; else spinner">
    <mat-list-option [selected]="todo.done" *ngFor="let todo of list.rows">
      <span [ngClass]="{ done: todo.done }">{{ todo.title }}</span>
    </mat-list-option>
  </mat-selection-list>

  <ng-template #spinner>
    <div class="spinner">
      <mat-spinner diameter="60" color="accent"></mat-spinner>
    </div>
  </ng-template>
</mat-card>
```

![How AsyncPipe, ngIf, nfFor, and ngClass works](images/async-ngif-ngfor-ngclass.gif)

### How to execute async operations before initialization

The mock DB implementation so far has an error. When site data is cleared and the page is refreshed, the first response is empty.

![Clearing site data before async initializer implementation](images/clear-site-data-before-async-initializer.gif)

This is due to lack of proper asynchronous initialization. `APP_INITIALIZER` serves that purpose.

```ts
{
  provide: APP_INITIALIZER,
  useFactory: () => {
    return async () => {
      await seedDb();
      worker.start();
    };
  },
  multi: true,
}
```

![Clearing site data after async initializer implementation](images/clear-site-data-after-async-initializer.gif)

### How to update a record

CRUD operations via AJAX are probably the most common implementations in web development. Angular has an awesome `HttpClient` to do all sorts of HTTP requests.

```ts
@Injectable()
export class TodoService {
  constructor(private http: HttpClient) {}

  update(id: string, input: TodoUpdate) {
    return this.http.put<void>(`/api/todos/${id}`, input);
  }
}
```

...and in component class...

```ts
@Component(/* removed for brevity */)
export class TodoListComponent {
  private listUpdate$ = new Subject<void>();

  list$ = merge(of(0), this.listUpdate$).pipe(
    switchMap(() => this.todo.getList())
  );

  constructor(private todo: TodoService, private dialog: MatDialog) {}

  toggleDone(todo: Rec<Todo>) {
    this.todo
      .update(todo.id, { title: todo.title, done: !todo.done })
      .subscribe(() => this.listUpdate$.next());
  }
}
```

![How to update a record](images/how-to-update-a-record.gif)

**Note:** Did you notice the canceled request? This is due to use of `switchMap` in `list$`.

### How to delete a record

Sometimes, we need to get some confirmation before proceeding with the request. `HttpClient` uses [RxJS observables](https://rxjs.dev/), so that usually is quite easy.

```ts
@Component(/* removed for brevity */)
export class TodoListComponent {
  @ViewChild("deleteDialog") deleteDialog?: TemplateRef<any>;

  /* removed for brevity */

  deleteRecord(todo: Rec<Todo>) {
    this.dialog
      .open(this.deleteDialog!, { data: todo.title })
      .afterClosed()
      .pipe(
        concatMap((confirmed) =>
          confirmed ? this.todo.delete(todo.id) : EMPTY
        )
      )
      .subscribe(() => this.listUpdate$.next());
  }
}
```

![How to delete a record](images/how-to-delete-a-record.gif)

### How to refactor routes

Angular modules manage their own child routes and parent modules are unaware of grand child routes. This makes it easy to refactor routes.

```ts
@NgModule({
  imports: [
    RouterModule.forChild([{ path: "", component: TodoListComponent }]),
  ],
  exports: [RouterModule],
})
export class TodoListRoutingModule {}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: MainLayoutComponent,
        children: [
          { path: "", pathMatch: "full", loadChildren: () => TodoListModule },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class TodosRoutingModule {}

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: "",
        loadChildren: () =>
          import("./todos/todos.module").then((m) => m.TodosModule),
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

Although there is now an additional module between, nothing changes.

![How to refactor routes](images/how-to-refactor-routes.png)

### How to create a new record

```sh
yarn ng g module todo-create --module=todos/todos --route=create
```

![How todo create module was generated](images/how-create-module-was-generated.gif)

```ts
@Component(/* removed for brevity */)
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
    this.router.navigate([".."]);
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
```

...and in template...

```html
<!-- removed for brevity -->

<form [formGroup]="form" id="todo-form" (ngSubmit)="submitForm()">
  <mat-form-field>
    <mat-label>Todo title *</mat-label>
    <input
      matInput
      formControlName="title"
      placeholder="Become a Jedi Knight"
      maxlength="256"
      autocomplete="off"
      #title
    />
    <mat-hint align="end">{{ title.value.length }} / 256</mat-hint>
    <mat-error *ngIf="form.get('title')?.invalid">
      Sorry, this field is <strong>required</strong>.
    </mat-error>
  </mat-form-field>
</form>

<!-- removed for brevity -->
```

![How reactive forms work](images/how-reactive-forms-work.gif)

### How HTTP errors were handled

```sh
yarn ng g interceptor common/error --flat
```

![How error interceptor was generated](images/how-error-interceptor-was-generated.gif)

...then...

```ts
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(({ error, status }) => {
        this.snackBar.open(`${status}: ${error}`, "HTTP Error", {
          duration: 3000,
        });
        return EMPTY;
      })
    );
  }
}
```

...and in root module...

```ts
@NgModule({
  /* removed for brevity */

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
```

**Note:** Http interceptors [can intercept outgoing requests as well](https://angular.io/guide/http#intercepting-requests-and-responses).

### How to get a production build of the app

```sh
yarn build --prod
```

![How to build an Angular app](images/how-to-build-an-angular-app.gif)

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
