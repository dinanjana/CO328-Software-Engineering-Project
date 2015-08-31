function validate(){

	var email  = document.getElementById("Email").value;
	var cemail = document.getElementById("cemail").value;
	var pass   = document.getElementById("password").value;
	var cpass  = document.getElementById("cpassword").value;

	if( cemail != email || pass != cpass){

		if(cemail != email){

			alert("Emails do not match!");
			return false;
		}
		if(pass != cpass){


			alert("Passwords do not match!");
			return false;
		}
		
	}else{

		return true;
	}
}