var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table")

var table;

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    selectAll();

});

function selectAll() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        table = new Table({
            head: ['Item Id#', 'Product Name', 'Price','Quantity'],
            style: {
                head: ['green'],
                compact: false,
                colAligns: ['center'],
            }
        });
    
        //loops through each item in the mysql database and pushes that information into a new row in the table
        for(var i = 0; i < res.length; i++){
            table.push(
                [res[i].item_id, res[i].itemName, res[i].price,res[i].stock_quantity]
            );
        }
        console.log(table.toString());
      
    
        inQuire();
    });
}

function inQuire() {
    inquirer.prompt([{
            type: "input",
            name: "ID",
            message: "Type the ID of what you would like to purchase"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many units would you like to buy?"


        }



    ]).then(function (answers) {
        // var custPurchase = {
        //     item_id: answers.ID,
        //     stock_quantity: answers.quantity
        // };

        connection.query('SELECT * FROM Products WHERE item_id=?', answers.ID, function (err, res) {
            if (err) console.log(err);
            if(res[0].item_id < answers.ID){
                console.log("This item doesn't exist!");
            }

            if (answers.quantity > res[0].stock_quantity) {
                console.log("-----------------------------");
                console.log('That product is out of stock!');
                
                console.log("-----------------------------");
                selectAll();
        } else if  (res[0].stock_quantity >= answers.quantity){
                console.log("----------------------------")
                console.log(answers.quantity +"" + res[0].itemName + " /s" + "  purchased for " + res[0].price + " each!");
                console.log("----------------------------")
                connection.query('UPDATE products SET ? WHERE ?',
                [
                  {
                    stock_quantity: res[0].stock_quantity - answers.quantity
                  },
                  {
                    item_id: answers.ID
                  }
                ],function(err, res) {
                    console.log("----------------------------")
                    console.log( "Stock Quantity updated!\n");
                    console.log("----------------------------")
                   selectAll();
                    
                  }
                );
            
            
            }
            
            
                //    connection.query('UPDATE products SET ? WHERE',function(err,res){
            //        res[0].stock_quantity = res[0].stock_quantity - answers.quantity;
            //        console.log(res[0].stock_quantity);
            //    })
            
        })
    })
}