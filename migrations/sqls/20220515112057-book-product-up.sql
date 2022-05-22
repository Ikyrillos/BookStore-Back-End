CREATE TABLE book_product(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL
);


insert into book_product (id, name, price)
VALUES (1,'teraLand',123);

insert into book_product (id, name, price)
VALUES (2,'terry',1234);

insert into book_product (id, name, price)
VALUES (3,'adam',125);

insert into book_product (id, name, price)
VALUES (4,'emy',12345);