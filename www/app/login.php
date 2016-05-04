<?php
	

	require_once('main-class.php');
	require_once('api.php');
	
	$h = new Budget();
	
	// $data = array(
	
	// 	array("name" =>  "muyt"),
	// 	array("password" =>  "life"),
	// 	array("type" => "individual")
		
	// );
	// $result = json_encode($data);

	// $request = json_decode($result);
	//
	// //echo $request[0]->name;
	$result = file_get_contents("php://input");
	if (isset($result)) {
		$request = json_decode($result);
		 $user = $request->name;
		$pwd = md5($request->password);
		$type = $h->userType($user, $pwd);
		
	
	$d = $h->login($user, $pwd, $type);
		
		if ($d) {
			@session_start();			

			if ($type == 'business') {
				$_SESSION['id'] = $d;
				$_SESSION['type'] = $type;
				$data=array($_SESSION['id'],$_SESSION['type']);
				echo json_encode($data) ;
				//echo $data ;
				
			}
			if ($type == 'individual') {
				$_SESSION['id'] = $d;
				$_SESSION['type'] = $type;
				$data=array($_SESSION['id'],$_SESSION['type']);
				echo json_encode($data) ;	
				//echo $data ;
			}

			

		} else {
			echo json_encode("Error in login") ;

		}
	
	} else {
		return false;
	} 

?>
