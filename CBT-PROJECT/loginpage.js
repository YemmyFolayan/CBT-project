var login = document.getElementById("login"),
showErr = document.getElementById("showError"),
username = document.getElementById("username"),
password = document.getElementById("password");
		


function setLoginMessage(input)
{
	
	if((input.value != "1234") && (input.value.length < 4))
	{
		showErr.innerHTML = "Enter a password of 4 characters, precisely: 1234";
	}
	
	else
	{
		showErr.innerHTML = "";
	}
}



$("#login").click(function(){
	if ((username.value != "") && (password.value.length == 4) && (password.value == "1234"))
	{
		sessionStorage.setItem("name",username.value);
		location.href = "welcome.html";
		return true;
	}
	
	else
	{
		return false;
	}
	
	
});





