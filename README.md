# Project Name
Plikter Responsibility and Behavior Application

## Description
Plikter Responsibility and Behavior is a mobile-first task manager application designed for parents or guardians to work with their children on setting daily, age appropriate responsibility and behavior expectations through a task table for each child within the family. As the day goes on, users can mark the responsibility or behavior task as complete, delete from the child's chart, or update with additional daily tasks as needed. 


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
);

INSERT INTO "tasks"
    ("task_name")
VALUES
    ('Collect Trash From Wastebaskets (Age 6+)'),
    ('Water Plants and Flowers (Age 6+)'),
    ('Clean Bathroom Sinks and Counter (Age 6+)'),
    ('Get the Mail (Age 5+)'),
    ('Empty Dishwasher (Age 6+)'),
    ('Load Dishwasher (Age 4+)'),
    ('Clear/Set Table (Age 4+)'),
    ('Pick Up Toys (Age 2+)'1),
    ('No Whining  (Age 3+)'),
    ('Vacuum Floors (Age 6+)'),
    ('Share (Age 2+)'),
    ('Keep Hands To Yourself (Age 2+)'),
    ('Feed Pets (Age 5+)'),
    ('Put Away Laundry (Age 5+)'),
    ('Comb Hair (Age 2+)'),
    ('Clean Up Bedroom (Age 2+)'),
    ('Make Bed (Age 3+)'),
    ('Brush Teeth (Age 2+)'),
    ('Collect Trash From Wastebaskets (Age 6+)';

CREATE TABLE "user_tasks"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT References "user",
    "child_id" INT References "children",
    "task_id" INT References "tasks",
    "complete" boolean,
    "due_date" varchar
);
```


## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`
* You will see the application load on the webpage

## How to Use Application
* On page load, a user can sign up to create a new Parent/Guardian account or a registered user can log-in to their account with their username and password
* Once the user account has been created, the user will be logged in automatically and advance directly to their user home page. The user can start to add their children to their account by selecting the Add Child button link.
* By clicking the Add Child button link, the user will be directed to the Add Child page to add the name of the child and their date of birth, then click the 'Save' button link to save this information to the user account. The user will then be directed to a confirmation page confirming the child has been added to their account. 
* After receiving confirmation that the child has been added to the user/s account, the user can click back to their User Account page by clicking the 'Home' button link
* Once arriving back on the user Home page, the child name will be displayed. The user can click on their child/s name button to advance to the child/s task table and create the child's task list for the day, selecting tasks from the dropdown list on the page. 


