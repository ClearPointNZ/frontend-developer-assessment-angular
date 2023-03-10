import { Component } from '@angular/core';
import { BaseToDoItem, ToDoItem } from './shared/models/to-do-item';
import { ApiService } from './shared/services/api-service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'TodoList';
  totalCount: number = 0;
  toDoItems: ToDoItem[] = [];
  //description: string = '';
  errorMsg = '';
  constructor(private apiService: ApiService) { 
    this.getToDoItems();
  }

  sort(items: any): any{
    // should use an utility service for such frequently used functions
    const sorted = items? items.sort((a: any, b:any)=> a.description.toLowerCase().localeCompare(b.description.toLowerCase())) : [];
    return sorted;
  }
  
  getToDoItems(): void{
    this.apiService.getItems().subscribe({
      next: response => {
        this.toDoItems = this.sort(response);
        this.totalCount = this.toDoItems.length;
    },
    error: error => this.errorMsg = error
  });   
  }

  saveToDoItem(description: string): void{
    console.log(description)
    const item: BaseToDoItem = { description: description, isCompleted: false };
    this.apiService.saveItem(item).subscribe({
      next: () => {
      this.getToDoItems();
    },
    error: error=>this.errorMsg = error});   
  }

  updateToDoItem(item: ToDoItem): void{
    item.isCompleted = !item.isCompleted;
    this.apiService.updateItem(item.id, item).subscribe({
      next: () => {
        this.getToDoItems();
    },
    error: error=>this.errorMsg = error});   
  }

  deleteToDoItem(id: string): void{
    this.apiService.deleteItem(id).subscribe({
      next: () => {
      this.getToDoItems();
    },
    error: error=>this.errorMsg = error});   
  }
}
