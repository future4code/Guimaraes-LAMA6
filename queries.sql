-- Active: 1658791594652@@35.226.146.116@3306@guimaraes-4211043-tiago-hennig

CREATE TABLE
    IF NOT EXISTS lama_bandas (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        music_genre VARCHAR(255) NOT NULL,
        responsible VARCHAR(255) UNIQUE NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS lama_shows (
        id VARCHAR(255) PRIMARY KEY,
        week_day VARCHAR(255) NOT NULL,
        start_time INT NOT NULL,
        end_time INT NOT NULL,
        band_id VARCHAR(255) NOT NULL,
        FOREIGN KEY(band_id) REFERENCES lama_bandas(id)
    );

CREATE TABLE
    IF NOT EXISTS lama_usuarios (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
    );

INSERT INTO lama_shows (id, week_day, start_time, end_time, band_id)
VALUES ("abbc", "sexta", 15.5, 16.5, "f1c53d4e-07f0-4b2c-b0fa-723a360c48d7");

