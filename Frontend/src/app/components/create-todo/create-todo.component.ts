import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { disallowValuesValidator } from 'src/app/validators/disallow.validator';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {
  @Output() public itemAdded = new EventEmitter<void>();

  public form = this.formBuilder.group({
    description: [
      '',
      [
        Validators.required,
        disallowValuesValidator(['cat', 'dog', 'yes', 'no']),
      ],
    ],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {}

  public onAddItem(): void {
    if (this.form.valid) {
      const command = { description: this.form.value.description || '' };

      this.todoService.createTodo(command).subscribe(() => {
        this.itemAdded.emit();
        this.onClear();
      });
    }
  }

  public onClear(): void {
    this.form.reset();
  }
}
