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

## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
