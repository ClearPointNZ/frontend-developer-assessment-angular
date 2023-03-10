export interface ToDoItem extends BaseToDoItem {
    id: string;
  }
  
export interface BaseToDoItem {
    description: string;
    isCompleted: boolean;
  }
  