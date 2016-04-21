
<?php
/*
*
*/


class AccountsController{

  public function __construct($app) {

    $this->routing($app);


  }

  public function routing($app) {

    $app->post('/signup', function ($req, $res) {

      $response->header('Access-Control-Allow-Origin', '*'); 
      $response->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, X-authentication, X-client');
      $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      AccountsController::SignupModel($req->getBody());

    });

  }

  private static function SignupModel($data) {
    // create account
    $res = array(
      "message" => "Signup Successful",
      "results" => array(
        "user_id" => 1,
        "user_name" => "John Waweru",
        "timestamp" => "Today"
      ),
      "signed_up" => true
    );

    echo json_encode($res);

  }


}