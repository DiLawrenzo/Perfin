<?php
	
	include "checks.php";
	
		$ds = $h->getIncomeToday($id);
		$ds = (int)$ds[0]["SUM(amount)"] ;

		if ($ds) {			
			echo json_encode($ds) ;

		} else {
			
		echo 0.00 ;

		}
 
	
?>
