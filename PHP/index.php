<?php


 header('Access-Control-Allow-Origin: *');  

require 'vendor/autoload.php';
require 'libs/NotORM/NotORM.php';

$app = new Slim\App;

require_once 'app/accounts.controller.php';

new AccountsController($app);
$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $this->view->render($response, 'index.html' );
    	//[ 'name' => $args['name']; ]
    	
})->setName('Home');
;

$app->get('/hello[/{name}]', function ($request, $response, $args) {
    $response->write("Hello, " . $args['name']);
    return $response;
})->setArgument('name', 'World!');


$app->run();