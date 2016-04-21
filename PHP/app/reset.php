<?php
@session_start();
require_once('api/main-class.php');
	$h = new Logic();

//reset


$id = $_REQUEST['id']; 


if (!$id){
echo "2"."<br/>Empty";
exit();
}

$query = "DELETE * FROM `income`.`id`  WHERE id='$id'";
$login = mysql_query($query); 

$count = mysql_num_rows($login);

$query1 = "DELETE * FROM `payments`.`id`  WHERE id='$id'";
$login2 = mysql_query($query1); 
$count2 = mysql_num_rows($login2);
/*
if($count<1 || $count2<1){
echo "0";
exit();
}
*/

?>