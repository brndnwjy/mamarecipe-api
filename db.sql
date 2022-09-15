CREATE DATABASE mamarecipe;

CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    name VARCHAR(32) NOT NULL,
    email VARCHAR(128) NOT NULL,
    phone VARCHAR(16) NOT NULL,
    password VARCHAR(256) NOT NULL,
    photo VARCHAR(256),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE recipes (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    ingredient VARCHAR NOT NULL,
    step VARCHAR NOT NULL,
    photo VARCHAR(256),
    video VARCHAR(256),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

INSERT INTO users (name, email, phone, password)
VALUES ('Brandon', 'brandon@mail.com', '6254679801', 'password');

INSERT INTO recipes (title, ingredient, step)
VALUES (
    'Soto Ayam', 

    'Ayam,
    Bawang Merah,
    Bawang Putih,
    Kemiri,
    Daun Salam,
    Daun Jeruk,
    Kunyit,
    Sereh,
    Lengkuas,
    Kol,
    Bihun,
    Penyedap Rasa,
    Bawang Goreng,
    Daun Bawang', 
    
    'Haluskan bawang merah, bawang putih, kemiri, lengkuas, kunyit dan sereh.
    Tumis bumbu halus sambil ditambahkan daun salam dan daun jeruk hingga wangi.
    Rebus ayam dengan bumbu halus yang sudah ditumis, tambahkan penyedap rasa seperti garam, micin dan lada.
    Angkat ayam dan potong menjadi bagian kecil.
    Sajikan di mangkuk dan tambahkan kol, bihun, bawang goreng dan daun bawang.
    Soto Ayam siap disantap dengan nasi hangat.');