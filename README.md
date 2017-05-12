# YelpCamp

| Name      | url         | method | description                      | mongoose method       |
| --------- | ----------- | ------ | -------------------------------- | --------------------- |
| INDEX     | /foos       | GET    | list all foo objects             | Foo.find              |
| NEW       | /foos/new   | GET    | form page to create new foo      |                       |
| CREATE    | /foos       | POST   | adds new foo                     | Foo.create            |
| SHOW      | /foos/:id   | GET    | shows info for one foo           | Foo.findById          |
| EDIT      | /foos/:id   | GET    | form page to edit foo            | 
| UPDATE    | /foos/:id   | GET    | updates info for one foo         | Foo.findByIdAndUpdate |
| DESTROY   | /foos/:id   | GET    | deletes one foo                  | Foo.findByIdAndDelete |