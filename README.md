# Waap
Weblog Web App with Express JS and React

## Installation

### Create MySQL tables 

``` sql
CREATE DATABASE waap_db;
USE waap_db;
CREATE TABLE db (
  id VARCHAR(36) PRIMARY KEY,
  type TEXT NOT NULL,
  subject TEXT NOT NULL,
  title TEXT NOT NULL,
  author_uid TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_surname TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  link TEXT NOT NULL,
  published TEXT NOT NULL
);
```


#### Create MySQL account

``` sql
CREATE USER '<USERNAME>'@'localhost' IDENTIFIED BY '<PASSWORDS>';
GRANT ALL PRIVILEGES ON *.* TO '<USERNAME>'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
exit;
```
then replace `<USERNAME>` and `<PASSWORDS>` in app.js