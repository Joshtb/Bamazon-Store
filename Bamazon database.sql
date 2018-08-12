CREATE DATABASE bamazon ;
use bamazon;
CREATE TABLE products(
item_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
itemName VARCHAR(30),
department_name VARCHAR(30),
price DECIMAL(10,2) NULL,
stock_quantity VARCHAR(10000) NULL
);

INSERT INTO products (itemName, department_name,price,stock_quantity)
VALUES("Nintendo Switch", "Tech",250,100);


INSERT INTO products (itemName, department_name,price,stock_quantity)
VALUES ("Copper Pot","Kitchen",25,30)
INSERT INTO products (itemName, department_name,price,stock_quantity)
VALUES("Blue Comforter","Room",60,15)

INSERT INTO products (itemName, department_name,price,stock_quantity)
VALUES("Van Gough Painting","Decor",99,1)

INSERT INTO products (itemName, department_name,price,stock_quantity)
VALUES ("Wall Mount", "Household Items",55,20)

INSERT INTO products ( itemName, department_name,price,stock_quantity)
VALUES ("Ipad","Tech", 299,16)

INSERT INTO products (itemName, department_name,price,stock_quantity)
VALUES ("5 Pans","Kitchen",40,16)

INSERT INTO products (itemName, department_name,price,stock_quantity)
VALUES("Silk Sheets","Room",70,5)

INSERT INTO products (itemName, department_name,price,stock_quantity)
VALUES("Tye Dye Tapestry","Decor",30,21)

INSERT INTO products (itemName, department_name,price,stock_quantity)
VALUES("Vaccum Cleaner","Household Items",45,30)


SELECT * FROM products;
