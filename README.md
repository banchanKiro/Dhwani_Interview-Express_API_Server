# Dhwani Interview-Express API Server

An express api server for the Dhwani Job Interview

## Overview

Please go through the wireframes below. 

You are required to design DB and create GET & POST
APIs based on the wireframes and share the same with us.

[Wireframe](https://xd.adobe.com/view/da5320fb-dbb3-4e2f-7647-cc8e7e860c7e-ac62/) for reference.

### Task Details
You are required to create following GET/POST APIs. You can refer below postman collection
URL for the request and response parameters.

[Postman collection](https://www.getpostman.com/collections/66c45e6146e3d7cbe41b)

### API List
+ User Login
+ User Logout
+ Get State
+ Post State
+ Get District
+ Post District
+ Get Child
+ Post Child

## Solution

To run the app, clone app to local and run the following commands.

The application requires **Node JS v12.14.0** and **PostgreSQL v11.5**. Download and install the same (or compatible) version to avoid any complications.

Install nodemon and knex globally using the command
```
npm install -g nodemon knex
```

Install app dependencies
```
npm install
```
**Before proceeding to the next steps, database setup is required.**
- Create your user (with username and password).
- Create database.
- make changes in `knexfile.js` and `/database/index.js` with the above credentials (username, password and database).

Run Migration
```
npm run migrate
```

Run Seed
```
npm run seed
```

Start app
```
npm run dev
```
### Postman

- Import the `postman_collection.json` in the root directory of the app into Postman (Made some alterations to the provided collection).
- Create environment and create entry { url: http://localhost:5000 }

The app is now ready for testing.
