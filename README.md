# Issues-Tracker

A Simple Kanban board implementation


# Contributors

[Don de Rojas](https://github.com/dderojas)
[Kelly Braun](https://github.com/KellyJohnBraun)

##TODO 

### Frontend
- [ ] Add startup instructions to README.md
- [ ] add nvm.rc and engine to package.json
- [ ] Allow User to add Columns
- [x] Pull tickets Dynamo DB on app open
- [x] Save tickets on any edit
 - [ ] Show error if save didn't work
- [ ] Add logo for header
- [ ] Get backlog button to toggle name depending on what board is showing
- [ ] Edit ticket modal, change title of create modal to "Edit Ticket"
  - [ ] Add ability to create and view comments
- [ ] Update button styling

- [ ] Allow use to move tickets to different Columns
- [x] Remove AWS SDK secrets from Provider file and use enviorment variables

### Backend
- [x] Add MVC and CRUD for dynamodb

### Future Enhancements

- [ ] User Sign in/ Auth
- [ ] Email alerts
- [ ] Different Projects
- [ ] Add status to tickets 
  - [ ] Links to other tickets that are blocking
  - [ ] assign users to tickets
