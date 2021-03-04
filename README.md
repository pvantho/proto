# Proto

Proto is a service written in NodeJs to find  Organisations and Business names in the CBD.
Koa , a fast and robust foundation,  has been used to build Web APIs.
Angular 11,  a powerful and scallable UI framework for the front-end.
Bootstrap 4 for responsive website.

SQLite3 is one of the fast database used by many companies around the world to build performant web applications.
Proto is using SQLITE3 VIEWS to access data. Proto does not see or manipulate Physical tables. All operations are against VIEWS.
VIEWS allow applications to be independant of data repositories should the physical tables change.

The Dataset has been imported from the government website into a main table called cbd_eateries.
Indexes have been created against columns such as trading_name, seating_type, number_of_seats, x_coordinate, y_coordinate, industry_description and industry_code to improve the search.

Proto Architecture is very simple and intuitive. It has been designed to help  developer to implement easily new middlewares and endpoints on Server side.
Below are the main folders to know for a developer.

Organisation of folders :

      1. api
            it's where you declare all your endpoints in terms of REST API
            for each controller , we have commands and queries folder.
            
            Queries folder contains all select only (READ)
            Commands folder contains delete/update operations (WRITE)
            
            The READ and WRITE should use two different domain models or schemas(CQRS concept).
            We should have a schema designed for READ inorder to have a better performance.
            below is the informative link about CQRS https://medium.com/@sderosiaux/cqrs-what-why-how-945543482313
            
            each controller has its  mapping.js file.
            mapping.js contains all the routes defined for your application.
            
            index.js is where you tell KOA to use your routes defined in mapping.js 
            ex: 
                .....
                configureMappings(router)
                  .add(myMapping1)
                  .add(myMapping2)
           
      2. services
            it's where your BUSINESS LOGIC needs to be implemented 
            
      3. infrastructure
            It's your DAO layer - It contains the code to talk to database.
      4. middlewares
            Authentication module can be added in that folder
      5. models
           Schema or domain model
      6. logs     
          errors, debug etc....
      7. __tests__
          JEST (unit testing)
      8. config
          logger (winston) and security configuration    
      9. src
         the main entry of angular code.
         
 
 
 
#SERVER SIDE

Tech/framework used
  Koa 
  Sqlite3

#CLIENT SIDE
Tech/framework used
Angular 11

Below is the explanation of how to build and run Angular locally.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
