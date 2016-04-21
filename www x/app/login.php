<?php
	
	require_once('main-class.php');
	require_once('api.php');

	$h = new Budget();
	
	$postdata = file_get_contents("php://input");
	if (isset($postdata)) {
		$request = json_decode($postdata);
		$user = $request->name;
		$pwd = md5($request->password);
		$type = $request->type;

	$d = $h->login($user, $pwd, $type);

	if ($d) {
		@session_start();
		$_SESSION['id'] = $d;

		echo json_encode($d) ;

	} else {
		echo json_encode("Error in login") ;

	}
	
	} else {
		echo "Not called with all parameters!";
	}

?>
