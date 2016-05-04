<?php 

require_once('main-class.php');
require_once('api.php');
	
$h = new Budget();

session_start();

if(!isset($_SESSION['id'])) {
	return false;
}
else  {
	$id = $_SESSION['id'];
}
?>