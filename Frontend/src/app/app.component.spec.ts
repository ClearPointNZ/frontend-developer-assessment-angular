import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: any;
  const mockData = [{id: 'a', description: 'a test', isCompleted: false}, {id: 'b', description: 'b test', isCompleted: true}];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [ HttpClientTestingModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
 });

  it('should display the title', () => {
    expect(compiled.querySelector('.h4')?.textContent).toContain('Todo List App (Angular)');
  });

  it('should display the correct total count', () => {
    expect(compiled.querySelector('h1')?.textContent).toContain('Showing 0 Item(s)');
    component.toDoItems = mockData;
    fixture.detectChanges();
    expect(compiled.querySelector('h1')?.textContent).toContain('Showing 2 Item(s)');
  });

  it('should display Mark as Completed when item isCompleted is false', () => {
    expect(compiled.querySelector('.update-button')).toBeNull();
    component.toDoItems = mockData;
    fixture.detectChanges();
    expect(compiled.querySelector('#a .update-button')?.textContent).toContain('Mark as Completed');
  });

  it('should display Mark as Incompleted when item isCompleted is true', () => {
    expect(compiled.querySelector('.update-button:nth-of-type(1)')).toBeNull();
    component.toDoItems = mockData;
    fixture.detectChanges();
    expect(compiled.querySelector('#b .update-button')?.textContent).toContain('Mark as Incompleted');
  });

  it('should sort list in alphabetical by description', () => {
    let list = [{id: 'a', description: 'b test', isCompleted: false}, {id: 'b', description: 'a test', isCompleted: true}];
    let sort = [{id: 'b', description: 'a test', isCompleted: true}, {id: 'a', description: 'b test', isCompleted: false}];
    component.sort(list);
    expect(list).toEqual(sort);
    list = [{id: 'a', description: '1 test', isCompleted: false}, {id: 'b', description: 'a test', isCompleted: true}];
    sort = [{id: 'a', description: '1 test', isCompleted: false}, {id: 'b', description: 'a test', isCompleted: true}];
    component.sort(list);
    expect(list).toEqual(sort);
  });
});
