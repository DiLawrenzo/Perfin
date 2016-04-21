<?php
@session_start();
require_once('api/main-class.php');
	$h = new Logic();


//receive the data sent from the app

$id = $_REQUEST['id'];
$type = $_REQUEST['type'];
$total = $_REQUEST['total'];
$date = date("y-m-d");
if(!$id ||!$type||!$total) 
{
echo "Empty Fields";
//Display the error message.
exit();
}

//Insert the database
$query = "insert into payments (id, type, total, date)
values('$id', '$type', '$total', '$date')";

//execute query
$result = mysql_query($query);

if ($result)
{echo "Saved";
} else{
echo "Not Saved";}


?>
 