<?php
	
	include "checks.php";
	
		//echo $;

		$ds = $h->getIncome($id);
				
		if ($ds) {
			//$ds = implode(';', $ds);

			echo json_encode($ds) ;

		} else {
		echo "0" ;

		}

 
	
?>
