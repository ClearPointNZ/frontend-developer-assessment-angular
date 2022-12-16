export interface TodoItem extends BaseTodoItem {
  id: string;
}

export class BaseTodoItem {
  description: string;
  isCompleted: boolean;

  constructor(description: string) {
    this.description = description;
    this.isCompleted = false;
  }
}
