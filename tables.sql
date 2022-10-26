CREATE TABLE messages (ID SERIAL PRIMARY KEY, senderId INT NOT NULL, recipientId INT NOT NULL, text varchar(255) NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT now());

CREATE TABLE users (ID SERIAL PRIMARY KEY, username varchar(255) NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT now());

ALTER TABLE messages ADD CONSTRAINT fk_messages_recipient FOREIGN KEY (recipientId) REFERENCES users (id);