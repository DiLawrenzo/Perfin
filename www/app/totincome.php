<?php
	
	include "checks.php";
	
	
		$ds = $h->getTotIncome();

		if ($ds) {
			//$ds = implode(';', $ds);
			echo json_encode($ds) ;

		} else {
		echo json_encode("Error in getting Incomes") ;

		}

 
	
?>
