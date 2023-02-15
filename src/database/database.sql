-- Active: 1676320968975@@127.0.0.1@3306
CREATE TABLE articles(
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO articles(id, title, url, author)
VALUES("001","Renomeando nome de pastas em Python","https://www.tabnews.com.br/marioleite/renomeando-nome-de-pastas-em-python", "Fernando Henrique" );



