import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToDoItemsFormComponent } from './components/to-do-items-form/to-do-items-form.component';
import { ForbiddenItemsDirective } from './shared/directives/forbidden-item/forbidden-items.directive';


@NgModule({
  declarations: [
    AppComponent,
    ToDoItemsFormComponent,
    ForbiddenItemsDirective
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
