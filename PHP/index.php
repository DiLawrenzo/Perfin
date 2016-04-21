<?php


 header('Access-Control-Allow-Origin: *');  

require 'vendor/autoload.php';
require 'libs/NotORM/NotORM.php';

$app = new \Slim\App;

require_once 'app/accounts.controller.php';

new AccountsController($app);

$app->run();