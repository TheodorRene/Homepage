CREATE TABLE books (
    bookID SERIAL PRIMARY KEY,
    title varchar(255) NOT NULL,
    author varchar(255),
    year varchar(4),
    buyprice INTEGER NOT NULL,
    sellprice INTEGER
);
