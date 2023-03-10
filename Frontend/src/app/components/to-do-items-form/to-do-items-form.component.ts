import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-to-do-items-form',
  templateUrl: './to-do-items-form.component.html',
  styleUrls: ['./to-do-items-form.component.scss']
})
export class ToDoItemsFormComponent implements OnInit {

  @Input() errorMsg = '';
  @Output() addClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorMsgChange: EventEmitter<string> = new EventEmitter<string>();
  description: string = '';
  
  constructor() { 
  }

  ngOnInit(): void {
  }

  add(): void{
    this.addClick.emit(this.description);
  }
}
