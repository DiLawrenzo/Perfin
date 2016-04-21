<?php

mysql_connect("localhost", "root", "");

//connect to db
mysql_select_db("budgetbook");

$id = $_REQUEST['id']; 

if (!$id){
echo "2"."<br/>Empty";
exit();
}

$query = "SELECT * FROM income  WHERE id='$id'";
$login = mysql_query($query); 

$count = mysql_num_rows($login);

$query1 = "SELECT * FROM payments  WHERE id='$id'";
$login2 = mysql_query($query1); 
$totalPayments = 0;
while ($colm1 = mysql_fetch_array($login2)){
$totalPayments+=$colm1['total'];
}

if($count<1){
echo "0";
}

else {
$totalIncome = 0;
while ($colm = mysql_fetch_array($login)){
$totalIncome+=$colm['total'];
}


}


echo "Total Income:".$totalIncome;
print"\n";
echo "Total payments:".$totalPayments;
print"\n";


$balance =$totalIncome-$totalPayments;
echo "Balance: ".$balance;






?>
