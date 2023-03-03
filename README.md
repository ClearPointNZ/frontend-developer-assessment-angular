# Luke Foster - Todo List app

---

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
