
<form action="login.php" method="post">
	<input type="text" name="name" ></input>
	<input type="text" name="password" >
	<input type="hidden" name="type" value="individual">
	<input type="submit" name="login" value="SUBMIT">
</form>

<h4>
	<?php
	
if (isset($_POST['login'])){
	$name = $_POST['name'];
	$password = $_POST['password'];
	$type = $_POST['type'];
	$data = array($name,$password);
	array_push($data, $type);
	$options = array(
	  'http' => array(
	    'method'  => 'POST',
	    'content' => json_encode( $data ),
	    'header'=>  "Content-Type: application/json\r\n" .
	                "Accept: application/json\r\n"
	    )
	);

	$context  = stream_context_create( $options );
	echo json_encode($data);
}

?>
</h4>