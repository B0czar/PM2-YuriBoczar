CREATE TABLE if not exists "users"(
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");
COMMENT
ON COLUMN
    "users"."password" IS '(criptografada)';
CREATE TABLE if not exists "tasks"(
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "user_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "due_date" DATE NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL
);
ALTER TABLE
    "tasks" ADD PRIMARY KEY("id");
CREATE TABLE if not exists "categories"(
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "categories" ADD PRIMARY KEY("id");
ALTER TABLE
    "tasks" ADD CONSTRAINT "tasks_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "categories"("id");
ALTER TABLE
    "tasks" ADD CONSTRAINT "tasks_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");

