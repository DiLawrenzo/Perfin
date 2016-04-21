<?php
	
	require_once('main-class.php');
	require_once('api.php');

	$h = new Budget();
	
	$postdata = file_get_contents("php://input");

	if (isset($postdata)) {
		$request = json_decode($postdata);

		$name = $request->username;
		$email = $request->email;
		$pwd = md5($request->password);
		$type = $request->type;

	
	$r = $h->signup($name, $email, $pwd,$type);
	
	if ($r) {
		@session_start();
		$_SESSION['id'] = $r;

		echo $r ;

		} else {
		echo json_encode("Error in signup");
		} 
	
	} else {
		echo false;
	}
?>

