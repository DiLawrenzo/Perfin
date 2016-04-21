<?php
	
	require_once('main-class.php');
	require_once('api.php');

	$h = new Budget();
	
	$postdata = file_get_contents("php://input");
	if (isset($postdata)) {
		$request = json_decode($postdata);
		$amount = $request->amount;
		$date =  $request->date;
		$title = $request->title;
		$account = $request->account;
		$notes = $request->notes;

		//echo json_encode($request) ;
	
		$d = $h->addExpense($amount, $date, $title, $account, $notes);

		if ($d) {
			//$ds = implode(';', $ds);
			echo json_encode($d) ;

		} else {
		echo json_encode("Error in adding Expense") ;

		}
	
	} else {
		
		echo json_encode("Error in getting Expenses data") ;
 }
	
?>
