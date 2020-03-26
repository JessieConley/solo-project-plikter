
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
    ('Put Toys Away', 1),
    ('Make Bed', 2),
    ('Clean Up Room', 1),
    ('Help with Outdoor Chores', 4),
    ('Fold Laundry and Put Away', 4),
    ('Help with Indoor Chores', 3),
    ('Keep Hands To Yourself', 1),
    ('Share', 1),
    ('Show Respect', 2),
    ('Say Please and Thank You', 1),
    ('No Whining', 1);

CREATE TABLE "user_tasks"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT References "user",
    "child_id" INT References "children",
    "task_id" INT References "tasks",
    "complete" boolean,
    "due_date" varchar
);


