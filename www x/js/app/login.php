<?php
	
	require_once('main-class.php');
	require_once('api.php');

	$h = new Budget();
	
	$postdata = file_get_contents("php://input");
	if (isset($postdata)) {
		$request = json_decode($postdata);
		$email = $request->email;
		$pwd = $request->password;

	$d = $h->login($email, $pwd);

	if ($d) {
		@session_start();
		$_SESSION['id'] = $d;

		header("location: ../profile.php?id=".$_SESSION['id']);

	} else {
		header("location: ../../account.html");

	}
	
	} else {
		echo "Not called properly with username parameter!";
	}

?>
