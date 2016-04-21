<?php
@session_start();
require_once('api/main-class.php');
	$h = new Logic();

//receive the data sent from the app

$id = $_REQUEST['id'];
$type = $_REQUEST['type'];
$total = $_REQUEST['total'];

if(!$id ||!$type||!$total) 
{
echo "Empty Fields";
//Display the error message.
exit();
}

//Insert the database
$query = "insert into regular (id, type, total)
values('$id', '$type', '$total')";

//execute query
$result = mysql_query($query);

if ($result)
{echo "Saved";
} else{
echo "Not Saved";}


?>
 