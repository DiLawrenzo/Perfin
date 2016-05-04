<?php
	
	include "checks.php";
	
	
		$ds = $h->getTotExpense();

		if ($ds) {
			//$ds = implode(';', $ds);
			echo $ds;
			exit();
			//echo json_encode($ds) ;

		} else {
		echo json_encode("Error in getting Expenses") ;

		}

 
	
?>
