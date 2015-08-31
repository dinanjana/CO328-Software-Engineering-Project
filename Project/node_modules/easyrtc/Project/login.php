<?php 

	if(isset($_POST['signin'])){
	 
	 $usr = htmlentities($_POST['name']);
	 $pass = htmlentities($_POST['password']);

	 $con = mysqli_connect("localhost", "root", "", "hello");

	 $stmt = "SELECT * FROM login WHERE username = '".$usr."'";

	 $querry = mysqli_query($con,$stmt) ;

	 $res = mysqli_fetch_assoc($querry);

	 if ($res == NULL){

	 	echo "Incorrect username or password 1 ";

	 	
	 }else {
	 	
	 	if(sha1($pass) == $res['password']){

	 		echo "Success";
	 	}else{

	 		echo "Incorrect username or password 2";
	 	}
	 }

	}
?>