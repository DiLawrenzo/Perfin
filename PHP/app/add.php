<?php
mysql_connect("localhost", "root", "");

//connect to db
mysql_select_db("budgetbook");

//receive the data sent from the app
$name= $_REQUEST['name'];
$email =$_REQUEST['email']; 
$password = $_REQUEST['password'];
$password2 = $_REQUEST['password2'];

if(!$name ||!$email ||!$password ||!$password2) 
{
echo "2";
//Display the error message.
exit();
}
else{
echo "11 \n"; }

//Insert the database
$query = "insert into users (id, name, email, password)
values(null, '$name', '$email', '$password', '$password2')";

//execute query
$result = mysql_query($query);

if ($result)
{echo "1";
} else{
echo "0";}

?>
 
 

