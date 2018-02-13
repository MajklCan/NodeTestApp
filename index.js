const express = require('express');
const exhbs = require('express-handlebars');
const con = require('./db.js');
const cors = require('cors');
//const bodyParser = require('body-parser')

const app = express();
app.use(cors())

//app.use(bodyParser.json())



 app.engine('handlebars', exhbs({defaultLayout: 'main'}));
 app.set('view engine', 'handlebars');

 app.get('/', function (req, res) {
    con.query("SELECT * FROM customers",(err,result)=>{
        //res.render('index',{"data": result,"login": err})
        res.json(result);
    }) 
 }); 
 app.get('/index', function (req, res) {
    con.query("SELECT * FROM customers",(err,result)=>{
        res.render('index',{"data": result})
        //res.json({"data": result});
    }) 
}); 

 app.get('/user/:id', function (req, res) {
    con.query("SELECT * FROM customers WHERE cust_id="+req.params.id+
    ";SELECT ord_ite.orde_id, customers.cust_id, items.item_id, orders.orde_date, items.name, SUM(ord_ite.price) AS sum_price FROM orders INNER JOIN ord_ite ON ord_ite.orde_id = orders.orde_id INNER JOIN customers ON customers.cust_id = orders.cust_id INNER JOIN items ON items.item_id = ord_ite.item_id GROUP BY ord_ite.orde_id, items.name HAVING customers.cust_id = "+
    req.params.id,
    (err,result)=>{
        res.render('user',{"data": result})
        //res.json({"data": result});
    }) 
}); 

app.get('/UserList', function (req, res) {
    con.query("SELECT * FROM customers",(err,result)=>{
        //res.render('index',{"data": result,"login": err})
        res.json(result);
    }) 
 });

/* app.get('/deleteUser/:id', function (req, res) {
    con.query("SELECT * FROM users",(err,result)=>{
       // res.render('index',{"data": result,"input":true})
       console.log(req.params.id)
       con.query("DELETE FROM users WHERE id_user ="+req.params.id,(err,result)=>{
            res.redirect('http://localhost:5500/');
        })
       res.end()
    }) 
});  */


app.listen(5050);
