function confirm(){
	console.log("IN");
	const pass1 = document.getElementById('pass');
	const pass2 = document.getElementById('re_pass');

	if(pass1.value == pass2.value){
		pass2.setCustomValidity('');
	}
	else{
		pass2.setCustomValidity('Please Make Passwords Match');
	}
	console.log('pass2 customError ', document.getElementById('re_pass').validity.customError);
	console.log('pass2 validationMessage ', document.getElementById('re_pass').validationMessage);
}