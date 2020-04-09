
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
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
    "level" INT,
    "account_user_id" INT References "user"
);

INSERT INTO "tasks"
    ("task_name", "level")
VALUES
    ('Clear/Set Table (Age 4+)', 3),
    ('Load Dishwasher (Age 4+)', 3),
    ('Empty Dishwasher (Age 6+)', 4),
    ('Get the Mail (Age 5+)', 4),
    ('Clean Bathroom Sinks and Counter (Age 6+)', 4),
    ('Water Plants and Flowers (Age 6+)', 4),
    ('Collect Trash From Wastebaskets (Age 6+)', 4);

CREATE TABLE "user_tasks"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT References "user",
    "child_id" INT References "children",
    "task_id" INT References "tasks",
    "complete" boolean,
    "due_date" varchar
);


