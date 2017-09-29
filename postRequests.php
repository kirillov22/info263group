<?php
	require_once("include/config.php");
	$conn = getConnection($hostname, $username, $password, $database);
	if ($conn->connect_error) {
		fatalError($conn->error);
		return;
	}
	
	
	if (isset($_POST['allRoutes'])) {
		$query = 'SELECT DISTINCT route_short_name FROM akl_transport.routes ORDER BY route_short_name ASC';
		$result = $conn->query($query);
		$routeArray = getAllRoutes($result);
		$conn->close();
		
		echo($routeArray);
	}
	else if (isset($_POST['queryAPI'])) {
		/*//$query = 'SELECT DISTINCT count(trips.trip_id) FROM akl_transport.routes, akl_transport.trips';
		$query = "SELECT DISTINCT trips.trip_id FROM akl_transport.trips WHERE routes.route_id = trips.route_id AND routes.route_short_name = '002'";
		//$query = 'SELECT DISTINCT zone_id FROM akl_transport.stops;';
		$query = mysqli_real_escape_string($conn, $query);
		$queryResult = $conn->query($query);
		$locations = getBusLocations($queryResult);
		$conn->close();
		*/
		
		//$query = 'SELECT DISTINCT route_short_name FROM akl_transport.routes ORDER BY route_short_name DESC';
		$query = "SELECT DISTINCT trip_id FROM trips WHERE routes.route_id = trips.route_id AND routes.route_short_name = '002'";
		//$query = "SELECT route_id FROM routes WHERE route_short_name = 'SKY'";
		$query = mysqli_real_escape_string($conn, $query);
		$result = $conn->query($query);
		$trips = getBusLocations($result);
		$conn->close();

		
		print_r($trips);
	}
	
	
	function getConnection ($hostname, $username, $password, $database) {
		$conn = new mysqli($hostname, $username, $password, $database);
		
		if ($conn->connect_error) {
			fatalError($conn->connect_error);
			return false;
		} else {
			return $conn;
		}
	}
		
	
	function getAllRoutes($queryResult) {
		$routes = array();
		if ($queryResult) {
			while ($row = $queryResult->fetch_array(MYSQLI_ASSOC)) {
		        $routes[] = $row['route_short_name'];
		    }
			$json = json_encode($routes);
		}
		return $json;
	}
	
	
	/*
	* The query is not returning anything for some reason.
	* Error log is just showing "1". No idea what to do....
	*/
	function getBusLocations($queryResult) {
	/*
		$locations = array();
		$json = "";
		//error_log(print_r($queryResult), 3, 'error.txt');
		if ($queryResult) {
			while ($row = $queryResult->fetch_assoc()) {
		        $locations[] = $row['trip_id'];
		        //error_log(print($row['zone_id']), 3, 'error2.txt');
		        error_log($row['trip_id'], 3, 'error2.txt');
		    }
		    $json = json_encode($locations);
		}
		error_log(print_r($locations), 3, 'error.txt');
		return $json;
		*/
		
		$trips = array();
		error_log('Query Result: ' . $queryResult . "\n", 3, 'error.txt');
		while ($row = mysqli_fetch_array($queryResult)) {
			unset($trip);
			$trip = $row['trip_id'];
	        array_push($trips, $trip);
	        error_log('TRIP LINE: ' . $trip . "\n", 3, 'log.txt');
	        //echo($trip);
	        //echo("\n");
	    }
		//$json = json_encode($trips);
		return $trips;
	}
?>