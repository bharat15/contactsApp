var mysql = require('mysql');

var sql;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb"
});


function addContactsToDB(){
	con.connect(function(err) {
  	if (err) throw err;
  		console.log("Connected!"); 
	});
	var cname = $("#name").val();
	var cemail = $("#email").val();
	var cmobile = $("#mobile").val();
	var caddress = $("#address").val();
	var ctype = $("#type option:selected").text();
	sql = "INSERT INTO contacts (name ,email , mobile , address, type) VALUES ('"+ cname +"','"+ cemail +"','"+ cmobile +"','"+ caddress +"','"+ ctype +"')";
	console.log(sql)
	con.query(sql, function (err, result) {
    if (err) throw err;
    cconsole.log("1 record inserted, ID: " + result.insertId);
  });
}