# Waap
Weblog Web App with Express JS and React

## Installation

### Create MySQL tables 

``` sql
CREATE DATABASE waap_db;
USE waap_db;
CREATE TABLE videos (
  id VARCHAR(36) PRIMARY KEY,
  url TEXT NOT NULL
);
CREATE TABLE songs (
  id VARCHAR(36) PRIMARY KEY,
  url TEXT NOT NULL
);
CREATE TABLE docs (
  id VARCHAR(36) PRIMARY KEY,
  url TEXT NOT NULL
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