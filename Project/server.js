// Load required modules
var http    = require("http");              // http server core module
var express = require("express");           // web framework external module
var io      = require("socket.io");         // web socket external module
var easyrtc = require("easyrtc");           // EasyRTC external module
var mysql   = require('mysql'); 			// Mysql include
var bodyParser = require("body-parser"); 	// Body parser for fetch posted data



// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();

httpApp.use(express.static(__dirname + "/static/"));

httpApp.set('view engine', 'ejs');
// Start Express http server on port 8080
var webServer = http.createServer(httpApp).listen(8080);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level":1});

// Start EasyRTC server
var rtc = easyrtc.listen(httpApp, socketServer);

var connection = mysql.createConnection({ // Mysql Connection
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'hello',
    });
httpApp.use(bodyParser.urlencoded({ extended: false })); 
httpApp.use(bodyParser.json()); // Body parser use JSON data


httpApp.post('/login',function(req,res){
    var uname = req.body.name;
    var pass = req.body.password;
    var data = {
        "Data":""
    };
    connection.query("SELECT * from login WHERE username=? and password=? LIMIT 1",[uname,pass],function(err, rows, fields){
        if(rows.length != 0){
            data["Data"] = "Successfully logged in..";
            //res.sendfile("profile.html");
            connection.query("SELECT * from login WHERE username=? LIMIT 1",[uname],function(err, rows, fields){

  
            	var fname = rows[0].fullname;
            	var Email = rows[0].email;
            	var user = rows[0].username;

            	connection.query((("SELECT * from ").concat(uname)),function(err,rows,fields){

            		if(rows.length != 0){

            			res.render( 'Profiles/profile', { "title":fname , "email":Email ,"user":user , "supplies":rows} );


            		}
            	});
            	

            });
        }else{
            data["Data"] = "Email or password is incorrect.";
            res.json(data);
        }
    });
});


httpApp.post('/signup',function(req,res){
    var fname = req.body.firstname;
    var lname = req.body.lastname;
    var uname = req.body.username;
    var email = req.body.Email;
    var pass  = req.body.password;
    var space = " ";

    var data = {
        "Message":""
    };
    connection.query("SELECT * from login WHERE username=? LIMIT 1",[uname],function(err, rows, fields){
        if(rows.length != 0){
            data["Message"] = "User name is in use.Please pick a new one.";
            res.json(data);
        }else{
           
            connection.query("INSERT INTO login SET fullname=?, username=?, email=?, password=?",[(fname.concat(space)).concat(lname),uname,email,pass],function(err, results){
     
     			if(err){

     				console.log(err.message);
     			}else{
     				connection.query((("CREATE TABLE".concat(" ")).concat(uname)).concat(" (status VARCHAR(300) NOT NULL, date DATETIME , id INT(3) AUTO_INCREMENT PRIMARY KEY);"),function(err, rows, fields){

     					if(err){

     						console.log(err.message);
     					}


     					res.redirect("index.html");
     			   
    				});
        		}
    		});
    	}

	});

});


httpApp.post('/update_status',function(req,res){

	var status = req.body.stat;
	var user = req.body.uname;

	console.log(user.concat(" enterd a status"));

	connection.query((("INSERT INTO ").concat(user)).concat(" SET status=?"),[status],function(err, results){

		if(err){

			console.log(err.message);

		}
	});

	

});