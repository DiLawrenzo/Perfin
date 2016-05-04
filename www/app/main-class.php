<?php
	
	class Budget {

		private $db_conn;

		public function __construct() {

			try {
				$this->db_conn = new PDO('mysql:dbname=budgetbook;host=127.0.0.1', 'root', '');

			} catch (PDOException $e) {
				die('Connection failed: ' . $e->getMessage());

			}

		}
		
		public function signup($n, $e, $p, $t) {

			$query =  "INSERT INTO users (id, username, email, password, usertype, logged_in, rank)"
                . "VALUES (null, :username, :email, :password, :type, 'yes', 0)";

                $dh = $this->db_conn->prepare($query);

                $dh->execute(array(':username'=>$n, ':email'=>$e, ':password'=>$p, ':type'=>$t));

        	return $this->db_conn->lastInsertId();
		}

		public function login($u, $p, $t) {
			
			if ($t == 'business') {
					 $query = "SELECT id FROM users WHERE username = :username AND password = :password";

					$sh = $this->db_conn->prepare($query);
					$sh->setFetchMode(PDO::FETCH_ASSOC);
					$sh->execute(array(':username'=>$u, ':password'=>$p));

					$data = $sh->fetchall();
					$_n = $sh->rowCount();
					
					if ($_n == 1) {
						
						return $data[0]['id'];
					} else {
						return false;

					}
				}
				else if ($t == 'individual'){
					$query = "SELECT id FROM users WHERE username = :username AND password = :password";

					$sh = $this->db_conn->prepare($query);
					$sh->setFetchMode(PDO::FETCH_ASSOC);
					$sh->execute(array(':username'=>$u, ':password'=>$p));

					$data = $sh->fetchall();
					$_n = $sh->rowCount();

					if ($_n == 1) {
						return $data[0]['id'];
					} else {
						return false;

					}
					
				}
		}
		
		public function userType($u, $p) {
			$query = "SELECT usertype FROM users WHERE username = :username AND password = :password";

					$sh = $this->db_conn->prepare($query);
					$sh->setFetchMode(PDO::FETCH_ASSOC);
					$sh->execute(array(':username'=>$u, ':password'=>$p));

					$data = $sh->fetchall();
					$_n = $sh->rowCount();

					if ($_n == 1) {
						return $data[0]['usertype'];
					} else {
						return false;

					}
		}

		public function addprofile($n, $b) {

			$query =  "UPDATE profile SET( occ_field, balance)"
                . "VALUES ( :occ_field, :bal)";

                $dh = $this->db_conn->prepare($query);

                $dh->execute(array(':occ_field'=>$n, ':bal'=>$b, ));

        	return $this->db_conn->lastInsertId();
		}

		public function addClient($n, $d, $a) {

			$query =  "INSERT INTO client (client_id, client_name, status, account, debt)"
                . "VALUES (null, :name, :status ,'waiting', :account, 0)";

                $dh = $this->db_conn->prepare($query);

                $dh->execute(array(':name'=>$n, ':status'=>$d, ':account'=>$a) );

        	return $this->db_conn->lastInsertId();
		}
		
		public function addAccount($n, $a, $p, $c, $pd, $id) {

			$query =  "INSERT INTO accounts (id, ename, amount, notes, account, date, user_id)"
                . "VALUES (null, :title, :amount, :notes, :account, :date, :id)";

                $dh = $this->db_conn->prepare($query);

                $dh->execute(array(':amount'=>$n, ':date'=>$a, ':account'=>$c, ':title'=>$p,':notes'=>$pd, ':id'=>$id));

                return $this->db_conn->lastInsertId();
		}

		public function addIncome($n, $a, $p, $c, $pd, $id) {

			$query =  "INSERT INTO income (id, ename, amount, notes, account, date, user_id)"
                . "VALUES (null, :title, :amount, :notes, :account, :date, :id)";

                $dh = $this->db_conn->prepare($query);

                $dh->execute(array(':amount'=>$n, ':date'=>$a, ':account'=>$c, ':title'=>$p,':notes'=>$pd, ':id'=>$id));

                return $this->db_conn->lastInsertId();
        }

        public function addExpense($n, $a, $p, $c, $pd, $id) {

			$query =  "INSERT INTO expense (id, ename, amount, notes, account, date, user_id)"
                . "VALUES (null, :title, :amount, :notes, :account, :date, :id)";

                $dh = $this->db_conn->prepare($query);

                $dh->execute(array(':amount'=>$n, ':date'=>$a, ':account'=>$c, ':title'=>$p,':notes'=>$pd, ':id'=>$id));

                return $this->db_conn->lastInsertId();
		}

		public function addSaving($n, $a, $p, $c, $pd, $id ) {
			$query =  "INSERT INTO saving (id, ename, amount, notes, account, date, user_id)"
                . "VALUES (null, :title, :amount, :notes, :account, :date, :id)";

                $dh = $this->db_conn->prepare($query);

                $dh->execute(array(':amount'=>$n, ':date'=>$a, ':account'=>$c, ':title'=>$p,':notes'=>$pd, ':id'=>$id));

                return $this->db_conn->lastInsertId();
		}

        public function getIncome($id) {
            $query2 = "SELECT * FROM income WHERE user_id = '$id' ";

					$sh = $this->db_conn->prepare($query2);
					$sh->setFetchMode(PDO::FETCH_ASSOC);
					$sh->execute();

					$data = $sh->fetchall();
					
        			return $data;
        }

        public function getExpense($id) {
            $query2 = "SELECT * FROM expense WHERE user_id = '$id' ";

					$sh = $this->db_conn->prepare($query2);
					$sh->setFetchMode(PDO::FETCH_ASSOC);
					$sh->execute();

					$data = $sh->fetchall();
					
        			return $data;
        }

		public function getAccount($id) {
            $query2 = "SELECT * FROM accounts WHERE user_id = '$id' ";

					$sh = $this->db_conn->prepare($query2);
					$sh->setFetchMode(PDO::FETCH_ASSOC);
					$sh->execute();

					$data = $sh->fetchall();
					
        			return $data;
        }

        public function getSaving($id) {
        	$query2 = "SELECT * FROM saving WHERE user_id = '$id' ";

					$sh = $this->db_conn->prepare($query2);
					$sh->setFetchMode(PDO::FETCH_ASSOC);
					$sh->execute();

					$data = $sh->fetchall();
					
        			return $data;
        }
		public function getExpenseToday($id) {
			$today=date('Y-m-d');
			//var_dump($today);
            $query = "SELECT SUM(amount) FROM expense where date='$today' AND user_id = '$id' ";

					$sh = $this->db_conn->prepare($query);
					$sh->setFetchMode(PDO::FETCH_ASSOC);
					$sh->execute();
					
					$data = $sh->fetchall();
									
        			return $data;
        }

		public function getIncomeToday($id) {
            $today=date('Y-m-d');
			//var_dump($today);
            $query = "SELECT SUM(amount) FROM income where date='$today' && user_id = '$id' ";

					$sh = $this->db_conn->prepare($query);
					$sh->setFetchMode(PDO::FETCH_ASSOC);
					$sh->execute();
					
					$data = $sh->fetchall();
							
        			return $data;
        }

		public function addJobs($id, $description, $date ) {
			$selQuery1 = "SELECT supp_id FROM supplier WHERE id = $id";
			$sh = $this->db_conn->prepare($selQuery1);
			$sh->setFetchMode(PDO::FETCH_ASSOC);
			$sh->execute();

			$d = $sh->fetchall();
			$s = $d[0]['supp_id'];
			
			$selQuery2 = "SELECT client_id FROM client WHERE id = $id";
			$sh = $this->db_conn->prepare($selQuery2);
			$sh->setFetchMode(PDO::FETCH_ASSOC);
			$sh->execute();

			$d = $sh->fetchall();
			$c =  $d[0]['client'];
			
			$selQuery3 = "SELECT prod_id FROM product WHERE id = $id";
			$sh = $this->db_conn->prepare($selQuery3);
			$sh->setFetchMode(PDO::FETCH_ASSOC);
			$sh->execute();

			$d = $sh->fetchall();
			$p = $d[0]['prod_id'];

			$query =  "INSERT INTO supp_product (supp_prod_id, supp_id, client_id, prod_id, description, date_delivery)"
                . "VALUES (null, :supp, :client,  :prod, :description, :date)";

            $dh = $this->db_conn->prepare($query);

            $dh->execute(array(':supp'=>$s, ':client'=>$c, ':prod'=>$p, ':description'=>$description,  ':date'=>$date));

        	return $this->db_conn->lastInsertId();
		}
		
		public function addJob($t, $desc ) {

			$query =  "INSERT INTO jobs (job_id, title, status, description,  due_date)"
                . "VALUES (null, :title,  'pending', :descrip, null )";

            $dh = $this->db_conn->prepare($query);

            $dh->execute(array(':title'=>$t, ':descrip'=>$desc));

        	return $this->db_conn->lastInsertId();
		}
				
		public function readBalance($id) {

			$query = "SELECT id, name, email FROM profile WHERE id= :id";

			$sh = $this->db_conn->prepare($query);
			$sh->setFetchMode(PDO::FETCH_ASSOC);
			$sh->execute(array(':id'=>$id));

			$data = $sh->fetchall();
	        $user = $data[0];

	        $selQuery1 = "SELECT SELECT SUM(amount) FROM expense";
			$sh = $this->db_conn->prepare($selQuery1);
			$sh->setFetchMode(PDO::FETCH_ASSOC);
			$sh->execute();

			$d = $sh->fetchall();
			$e = $d[0]['amount'];
			while ($colm1 = mysql_fetch_array($e)){
			$totalb+=$colm1['total'];
			}
			
			$selQuery2 = "SELECT amount FROM income ";
			$sh = $this->db_conn->prepare($selQuery2);
			$sh->setFetchMode(PDO::FETCH_ASSOC);
			$sh->execute();

			$d = $sh->fetchall();
			$b =  $d[0]['amount'];
			while ($colm2 = mysql_fetch_array($login2)){
			$totalb+=$colm1['total'];
			}

			$bal = $totalb - $totale;
		}

		public function standcharge($d, $st, $a){
			//startDate = $d
			$todaydate = date("Y/m/d");
			$newDate = date("Y/m/d", strtotime($st+$d));
			if($newDate<=$todaydate){
				//select from db where trans = $trans
				//$bal = $row['bal']
				//$newBal = $bal - $a
				//update db set bal=$newbal where trans = $trans
				//update db set startDate = $newDate where id = $id

			}
		}

		public function readProfile($id) {

			$query = "SELECT id, name, email FROM profile WHERE id= :id";

			$sh = $this->db_conn->prepare($query);
			$sh->setFetchMode(PDO::FETCH_ASSOC);
			$sh->execute(array(':id'=>$id));

			$data = $sh->fetchall();

	        return $data[0];
		}

		public function readMyJobs($id) {

			$query = "SELECT * FROM jobs WHERE title = :id";

			$sh = $this->db_conn->prepare($query);
			$sh->setFetchMode(PDO::FETCH_ASSOC);
			$sh->execute(array(':id'=>$id));

			$data = $sh->fetchall();

	        return $data;
		}

		public function readAllJobs() {

			$query = "SELECT * FROM jobs";

			$sh = $this->db_conn->prepare($query);
			$sh->setFetchMode(PDO::FETCH_ASSOC);
			$sh->execute();

			$data = $sh->fetchall();

	        return $data;
		}

		public function updateProf($id, $upd) {
			foreach ($upd as $key => $value) {
				
				if (!empty($value)) {
					
					$query = "UPDATE profile SET $key = :value WHERE id = $id";
					$sh = $this->db_conn->prepare($query);
					$sh->execute(array(':value'=> $value));
				}
				

			}

			return true;
		}

		public function updateJobs($id, $upd) {

			foreach ($upd as $key => $value) {
				
				if (!empty($value)) {
					
					$query = "UPDATE jobs SET status = 'complete' WHERE job_id = $id";
					$sh = $this->db_conn->prepare($query);
					$sh->execute(array(':value'=> $value));
				}
				

			}

			return true;
		}
		
		public function updateCli($id, $upd) {

			foreach ($upd as $key => $value) {
				
				if (!empty($value)) {
					
					$query = "UPDATE client SET $key = :value WHERE id = $id";
					$sh = $this->db_conn->prepare($query);
					$sh->execute(array(':value'=> $value));
				}
				

			}

			return true;
		}
		
		public function updateExp($id, $upd) {

			foreach ($upd as $key => $value) {
				
				if (!empty($value)) {
					
					$query = "UPDATE expense SET $key = :value WHERE id = $id";
					$sh = $this->db_conn->prepare($query);
					$sh->execute(array(':value'=> $value));
				}
				

			}

			return true;
		}

		public function updateInc($id, $upd) {

			foreach ($upd as $key => $value) {
				
				if (!empty($value)) {
					
					$query = "UPDATE income SET $key = :value WHERE id = $id";
					$sh = $this->db_conn->prepare($query);
					$sh->execute(array(':value'=> $value));
				}
				

			}

			return true;
		}

		public function updateAccount($id, $upd) {

			foreach ($upd as $key => $value) {
				
				if (!empty($value)) {
					
					$query = "UPDATE account SET $key = :value WHERE id = $id";
					$sh = $this->db_conn->prepare($query);
					$sh->execute(array(':value'=> $value));
				}
				

			}

			return true;
		}

		public function deleteProfile($id) {

			$query = "DELETE FROM profile WHERE id = $id";
			$sh = $this->db_conn->prepare($query);
			$sh->execute();
			return true;
		}

		public function deleteJob($id) {

			$query = "DELETE FROM jobs WHERE id = $id";
			$sh = $this->db_conn->prepare($query);
			$sh->execute();
			return true;
		}

		public function deleteExp($id) {

			$query = "DELETE FROM expense WHERE id = $id";
			$sh = $this->db_conn->prepare($query);
			$sh->execute();
			return true;
		}

		public function deleteIncome($id) {

			$query = "DELETE FROM income WHERE id = $id";
			$sh = $this->db_conn->prepare($query);
			$sh->execute();
			return true;
		}

		public function deleteClient($id) {

			$query = "DELETE FROM client WHERE id = $id";
			$sh = $this->db_conn->prepare($query);
			$sh->execute();
			return true;
		}

		public function deleteAccount($id) {

			$query = "DELETE FROM account WHERE id = $id";
			$sh = $this->db_conn->prepare($query);
			$sh->execute();
			return true;
		}
	}
?>