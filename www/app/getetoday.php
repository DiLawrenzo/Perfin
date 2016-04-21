<?php
	
	require_once('main-class.php');
	require_once('api.php');

	$h = new Budget();
	
	
		$ds = $h->getExpenseToday();
		$ds = (int)$ds[0]["SUM(amount)"] ;

		if (!$ds) {			
			echo 0.00 ;

		} else {
			
		echo json_encode($ds) ;

		}

 
	
?>
