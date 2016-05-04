<?php
	
	include "checks.php";
	
	//echo $id;
		$ds = $h->getExpense($id);

		if ($ds) {
			//$ds = implode(';', $ds);
			echo json_encode($ds) ;

		} else {
		echo json_encode("0") ;

		}

 
	
?>
