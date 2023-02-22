DROP DATABASE IF EXISTS imagenesdb;
CREATE DATABASE imagenesdb CHARSET utf8mb4;
USE imagenesdb;

CREATE TABLE imagenes(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    imagen text NOT NULL,
    titulo VARCHAR(200),
    descripcion text,
    likes INT NOT NULL,
    dislikes INT NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP NOT NULL
);

drop table comentarios;
CREATE TABLE comentarios(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    autor VARCHAR(60) NOT NULL,
    comentario text NOT NULL,
    id_imagen INT UNSIGNED NOT NULL,
    FOREIGN KEY (id_imagen) REFERENCES imagenes(id),
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);