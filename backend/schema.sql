CREATE DATABASE note_app;

USE note_app;

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255)
);

CREATE TABLE category (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  icon VARCHAR(255),
  userId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE note (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  archived BOOLEAN DEFAULT false,
  userId INT NOT NULL,
  categoryId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (categoryId) REFERENCES category(id) ON DELETE CASCADE
);

INSERT INTO user (name, email, password) VALUES ('admin', 'admin@admin.com', 'admin');
INSERT INTO category (name, icon, userId) VALUES ('Work', '📁', 1);
INSERT INTO category (name, icon, userId) VALUES ('Shopping', '🛒', 1);
INSERT INTO category (name, icon, userId) VALUES ('Home', '🏠', 1);
INSERT INTO note (name, userId, categoryId) VALUES ('Work on project presentation', 1, 1);
INSERT INTO note (name, userId, categoryId) VALUES ('Call the client', 1, 1);
INSERT INTO note (name, userId, categoryId) VALUES ('Go grocery shopping', 1, 2);
INSERT INTO note (name, userId, categoryId) VALUES ('Buy milk', 1, 2);
INSERT INTO note (name, userId, categoryId) VALUES ('Clean the house', 1, 3);
INSERT INTO note (name, userId, categoryId) VALUES ('Do the laundry', 1, 3);
