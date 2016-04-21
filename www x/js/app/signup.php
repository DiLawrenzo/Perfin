<?php
	
	require_once('main-class.php');
	require_once('api.php');

	$h = new Budget();
	
	$postdata = file_get_contents("php://input");

	if (isset($postdata)) {
		$request = json_decode($postdata);
		echo $request;
	/*
		$name = $request->username;
		$email = $request->email;
		$pwd = $request->password;
		$type = $request->type;

	
	$r = $h->signup($name, $email, $pwd,$type);
	
	if ($r) {
		@session_start();
		$_SESSION['id'] = $r;

		header("location: ../setprofile.php?id=$r");

		} else {
		header("location: ../../account.html");
		} 
	*/
	} else {
		echo "Not called properly with username parameter!";
	}
?>

