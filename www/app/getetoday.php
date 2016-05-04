<?php
	
	include "checks.php";
	
	
		$ds = $h->getExpenseToday($id);
		$ds = (int)$ds[0]["SUM(amount)"] ;

		if (!$ds) {			
			echo 0.00 ;

		} else {
			
		echo json_encode($ds) ;

		}

 
	
?>
