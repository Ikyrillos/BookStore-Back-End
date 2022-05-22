CREATE TABLE order_books (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    status VARCHAR(255),
    product_id bigint REFERENCES book_product(id)
);