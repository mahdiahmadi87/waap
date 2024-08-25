# waap
Web app with Express JS and React

## installation

### Run these commands before running the APIs: 

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
* then replace <USERNAME> and <PASSWORDS> with your mysql username and passwords