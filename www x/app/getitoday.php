<?php
	
	require_once('main-class.php');
	require_once('api.php');

	$h = new Budget();
	
	
		$ds = $h->getIncomeToday();
		//echo $ds[0]["SUM(amount)"];
		if ($ds) {
			$ds = (int)$ds[0]["SUM(amount)"] ;
			echo $ds;

		} else {

			
		echo json_encode("Error in getting Expenses") ;

		}
 
	
?>
