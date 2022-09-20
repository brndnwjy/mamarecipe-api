CREATE DATABASE mamarecipe;

CREATE TABLE users (
    id UUID PRIMARY KEY, 
    name VARCHAR(32) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    phone VARCHAR(16) NOT NULL,
    password VARCHAR(64) NOT NULL,
    photo VARCHAR(256),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE recipes (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    ingredient VARCHAR NOT NULL,
    photo VARCHAR(256),
    video VARCHAR(256),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

INSERT INTO users (name, email, phone, password)
VALUES ('Brandon', 'brandon@mail.com', '6254679801', 'password');

INSERT INTO recipes (title, ingredient)
VALUES (
    'Soto Ayam',
    'Ayam, Bawang Merah, Bawang Putih, Kemiri, Daun Salam, Daun Jeruk, Kunyit, Sereh, Lengkuas, Kol, Bihun, Penyedap Rasa, Bawang Goreng, Daun Bawang'
    );