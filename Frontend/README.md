# Luke Foster - Todo List app

The readme and the first page of the app show different instructions, so I've completed the instructions in both.

##### What I've done:

1. Can add todos
2. Can delete todos
3. Can mark todos complete
4. Handle http errors
5. Added Toastr for displaying errors
6. Add validation for disallowed words list
7. Display all todos listed alphabetically
8. Add unit test
9. Improved layout and styling

##### Things I'd have done differently in a larger or real world production app:

- Broken up into modules for better organisation and the ability to lazy load. This would include a Core module for shared code, and a Todo module for that specific functionality
- The todo list would be paginated
- I considered inserting new todos into the list instead of refreshing the list, but in this case the performance didn't warrant the complexity
- Add end to end tests
- Considered responsive styling

---

# TodoList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
