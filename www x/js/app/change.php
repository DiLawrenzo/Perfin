<?php 

include("connection.php");

if(isset($_POST['submit'])) { 

$old = $_POST['old'];	
$username = $_POST['username'];
$password = $_POST['password'];
$password2 = $_POST['password2'];


if($password != $password2) {
echo "Sorry, wrong password. <br/> ";
echo "<a href='login.html'>Register Here</a>"; 
exit;
}

$query = "SELECT id FROM login WHERE username='$username' AND password='$old'";

$login = mysql_query($query) 
or die("MySQL Login Error: ".mysql_error()); 

if (mysql_num_rows($login) > 0) 
{ 
	$change = "UPDATE login SET password = '$password' 
	WHERE username = '$username'";
	$log = mysql_query($change) 
	or die("MySQL Login Error: ".mysql_error()); 
	
	echo "Successful Password Change <br/>";
	echo "<a href='login.html'>Login Here</a>"; 
	exit;
}
else 
{ 
echo "Error in Password Change ".$username."<br/>";
echo "<a href='login.html'>Click Here to Login</a>";
exit;
}
}
?>