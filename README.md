# Project Name
Plikter Responsibility and Behavior Application

## Description
Plikter Responsibility and Behavior is a task manager application that parents can use with their children to set daily responsibility and behavior expectations for each child within the family. Users can set up a responsibility chart for each child in their houshold and select tasks and behavios appropriate for the child's age. As the day goes on, users can mark the responsibility or behvior as complete or incomplete, delete from the child's chart, or update with additional daily expecations as needed. 


# Prime Solo Project
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

We **STRONGLY** recommend following these instructions carefully. It's a lot, and will take some time to set up, but your life will be much easier this way in the long run.

## Download (Don't Clone) This Repository

* Don't Fork or Clone. Instead, click the `Clone or Download` button and select `Download Zip`.
* Unzip the project and start with the code in that folder.
* Create a new GitHub project and push this code to the new repository.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and tables

Create a new database called `plikter_solo_app` and create the following tables:

```SQL
CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "name" varchar (100) not null,
    "username" varchar (80) unique not null,
    "password" varchar (1000) not null
);

CREATE TABLE "children"
(
    "id" SERIAL PRIMARY KEY,
    "child_name" varchar (100) not null,
    "date_of_birth" date not null
);

CREATE TABLE "tasks"
(
    "id" SERIAL PRIMARY KEY,
    "task_name" varchar,
    "account_user_id" INT References "user"
);

INSERT INTO "tasks"
    ("task_name")
VALUES
    ('Make Bed'),
    ('Clean Up Room'),
    ('Help with Outdoor Chores'),
    ('Fold Laundry and Put Away'),
    ('Help with Indoor Chores'),
    ('Keep Hands To Yourself'),
    ('Share'),
    ('Show Respect'),
    ('Say Please and Thank You'),
    ('No Whining'), 
    ('Put Toys Away');

CREATE TABLE "user_tasks"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT References "user",
    "child_id" INT References "children",
    "task_id" INT References "tasks",
    "complete" boolean,
    "due_date" varchar
);



## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## How to Use Application
-- From the home page, a user can sign up to create a new Parent/Guardian account
-- Once the user account has been created, the user will advance directly to their user account home page where they can start to add the names of the children they will be working with on responsibilities and behavior by selecting the 'Add Child' button
-- By clicking the 'Add Child' button, the user will be directed to a form page to add the  name of the child and their date of birth. Click the 'Save' button to save this information to the user account and direct to a confirmation page. 
-- After receiving confirmation that the child has been added, the user can click back to their user account page by clicking the 'Home' button
-- Once arriving back on the user Home page, the child name will be displayed. The user can click on their child/s name button to be directed to start creating a responsibility and behavior chart and managing tasks for this child. 


* Don't Fork or Clone. Instead, click the `Clone or Download` button and select `Download Zip`.
* Unzip the project and start with the code in that folder.
* Create a new GitHub project and push this code to the new repository.
## 
## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)


## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum. 

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. [Import the sample routes JSON file](./PostmanPrimeSoloRoutes.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
    1. `POST /api/user/register` registers a new user, see body to change username/password
    2. `POST /api/user/login` will login a user, see body to change username/password
    3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!


## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

* src/components
  * App/App
  * Footer/Footer
  * Nav/Nav
  * AboutPage/AboutPage
  * InfoPage/InfoPage
  * UserPage/UserPage
  * LoginPage/LoginPage
  * RegisterPage/RegisterPage
  * LogOutButton/LogOutButton
  * ProtectedRoute/ProtectedRoute

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2
