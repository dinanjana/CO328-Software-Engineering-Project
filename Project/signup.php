<?php 

if(isset($_POST['signup']) ){
	 
	 $fname = htmlentities($_POST['firstname']);
	 $lname = htmlentities($_POST['lastname']);
	 $email = htmlentities($_POST['Email']);
	 $cemail= htmlentities($_POST['cemail']);
	 $usr   = htmlentities($_POST['username']);
	 $pass  = htmlentities($_POST['password']);
	 $cpass = htmlentities($_POST['cpassword']);
	 $full  = $fname." ".$lname;

	 $con = mysqli_connect("localhost", "root", "", "hello");
	 
	 if($pass = $cpass){	//this needs to be done in index.html 
	 						//using javascript

	 	if($email = $cemail){

	 		$stmt = "SELECT id FROM login WHERE username = '".$usr."'";
	 		$querry = mysqli_query($con,$stmt) ;
	 		$res = mysqli_fetch_assoc($querry);

	 		if($res == NULL){

	 			$stmt = "SELECT email FROM login WHERE username = '".$usr."'";
	 			$querry = mysqli_query($con,$stmt) ;
	 			$res = mysqli_fetch_assoc($querry);

	 			if($res == NULL){

	 					$stmt = "INSERT INTO login (username,password,email,fullname) VALUES('".$usr."','SHA1(".$pass.")','".$email."','".$full."')";
	 					$querry = mysqli_query($con,$stmt) ;

	 					$stmt = "UPDATE login SET `password` = SHA1('".$pass."') WHERE username = '".$usr."'";
	 					$querry = mysqli_query($con,$stmt) ;


	 			}else{

	 				echo "Email is already in use.Please pick another one";
	 			}

	 		}else{

	 			echo "Username is alredy taken. Please use a different one";

	 		}


	 	}else{

	 		echo "Emails dosen't match";

	 	}


	 }else{

	 	echo "Passwords dosen't match";
	 }


}

?>