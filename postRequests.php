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
		$param = '002';
		$query = "SELECT DISTINCT trip_id FROM trips, routes WHERE routes.route_id = trips.route_id AND routes.route_short_name = '". $param ."'";
		$result = $conn->query($query);
		$trips = getBusLocations($result);
		$conn->close();

		echo($trips);
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
	
	
	function getBusLocations($queryResult) {		
		$trips = array();
		while ($row = $queryResult->fetch_array(MYSQLI_ASSOC)) {
			$trips[] = $row['trip_id'];
	    }
		$json = json_encode($trips);
		return $json;
	}
?>