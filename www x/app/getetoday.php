<?php
	
	require_once('main-class.php');
	require_once('api.php');

	$h = new Budget();
	
	
		$ds = $h->getExpenseToday();
		//echo $ds[0]["SUM(amount)"];
		if ($ds) {
			
			echo json_encode($ds) ;
		} else {

			
		echo json_encode("Error in getting Expenses") ;

		}

 
	
?>
