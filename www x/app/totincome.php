<?php
	
	require_once('main-class.php');
	require_once('api.php');

	$h = new Budget();
	
	
		$ds = $h->getTotIncome();

		if ($ds) {
			//$ds = implode(';', $ds);
			echo json_encode($ds) ;

		} else {
		echo json_encode("Error in getting Incomes") ;

		}

 
	
?>
