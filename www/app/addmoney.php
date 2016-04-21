<?php
@session_start();
require_once('api/main-class.php');
	$h = new Logic();

//addmoney

$income = 0;
$payments = 0;
$balance = 0;
//receive the data sent from the app
$id = $_REQUEST['id'];
$income = $_REQUEST['income'];
$payments = $_REQUEST['payments'];


/*if ($income && !$payments)
{$payments = 0;}
if ($payments && !$income)
{$income = 0;}
if(!$income ||!$payments){
echo "2";
//Display the error message.
exit();}
*/

//calculate balance
$balance = $income - $payments;


//Insert the database
$query = "insert into money (id, income, payments, balance)
values('$id', '$income', '$payments', '$balance')";

//execute query
$result = mysql_query($query);

if ($result)
{echo "Saved";
echo ": ";
} else{
echo "1 <Not Saved";}


$result2 = "SELECT * FROM total WHERE id='$id'";

$balance = mysql_query($result2); 

$count = mysql_num_rows($balance);

if($count<1){
echo "0 ";
exit();
}

else {
$colm = mysql_fetch_array($balance);
echo $colm['id'];
echo ":  ";
echo "Balance is ";

echo $colm['balance'];

} 
?>