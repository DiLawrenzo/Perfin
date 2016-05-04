<?php
	
	include "checks.php";
	
	$postdata = file_get_contents("php://input");
	if (isset($postdata)) {
		$request = json_decode($postdata);
		$amount = $request->amount;
		$date =  $request->date;
		$title = $request->title;
		$account = $request->account;
		$notes = $request->notes;

		//echo json_encode($request) ;
	
		$d = $h->addIncome($amount, $date, $title, $account, $notes, $id);

		if ($d) {
			//$ds = implode(';', $ds);
			echo json_encode($d) ;

		} else {
		echo json_encode("Error in adding Incomes") ;

		}

	} else {
		
		echo json_encode("Error in getting Income data") ;
 }
	
?>
