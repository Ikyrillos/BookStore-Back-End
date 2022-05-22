# Requirements
## User routes
1. **(POST)** http://localhost:3000/register
 - for creating a user with post method it requires the following "**body**"
and you can use it.

```json
{
    "username":"testUser1",
    "password":"TestuserPass",
    "email":"test@test.co"
}
```
after creating the user use the login route to get the auth token to use it in other apis.

 2. **(POST)** http://localhost:3000/login
- it is used to get the token to use it in other APIs that need token verifying.

## Books route

 1. (**GET**) http://localhost:3000/bookshelf 
 - it is used to get all the available books 
 - you will see there is already 4 books created for you.
2. (**GET**) http://localhost:3000/bookshelf/:id
- it is used get one book using a paramter of book id.
3. **(POST)**  http://localhost:3000/bookshelf (**NEEDS TOKEN VERYFING**)
- send data through the **body**   to create a book as example:

```json
{
    "id": 6,
    "name": "book6",
    "price":"1234" 
}
```

please note that i have used Thunder client in vs code and to veify the token i only needed to include the **token** (**which i got when i logged in** ) in the **auth** tap and put the code in **Bearer**   
4. **(DELETE)** http://localhost:3000/bookshelf/:id (**NEEDS TOKEN VERYFING**)
- it is used to delete book from database using id parameter.

## Orders route
**All the following routes Needs token verification**
1. **(GET)** http://localhost:3000/orders
	- gets all the orders from the current verified user.
2. **(POST)** http://localhost:3000/orders/:id
	-gets one specific  order from the current verified user using its id.
3. **(DELETE)** http://localhost:3000/orders/:id
	-Deletes one specific  order from the current verified user using its id.
4. **(POST)** http://localhost:3000/orders
	- creates order for the user so he can add products to.
	using the following body.

```json
{
    "orderId": "1",
    "status": "pending",
    "userId": "1" 
}
```
> :warning: **!!!! Please remember to add token in Bearer in auth tap. using thunder clinet in vs code** so your request can be verified and get completed.
5. **(POST)** http://localhost:3000/orders/:id/products
	- Adds product to the order using order id .

# Database schemas
## book_product table
stores all information about every single book.

```sql
CREATE TABLE book_product(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL
 );
```
## users table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    password_digest VARCHAR,
    email VARCHAR
);
```
## orders
define the user's order.
```sql
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
);
```
## order_books table
stores information about every order (e.g. quantity  and status).
```sql
CREATE TABLE order_books (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    status VARCHAR(255),
    product_id bigint REFERENCES book_product(id)
);
```