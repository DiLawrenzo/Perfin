<?php
	
	require_once('main-class.php');
	require_once('api.php');

	$h = new Budget();
	
	
		$ds = $h->getIncomeToday();
		$ds = (int)$ds[0]["SUM(amount)"] ;

		if ($ds) {			
			echo json_encode($ds) ;

		} else {
			
		echo 0.00 ;

		}
 
	
?>
