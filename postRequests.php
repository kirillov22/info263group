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
		$query = 'SELECT DISTINCT count(trips.trip_id) FROM akl_transport.routes, akl_transport.trips';
		//$query = "SELECT DISTINCT trips.trip_id FROM akl_transport.trips WHERE akl_transport.routes.route_id = akl_transport.trips.route_id AND akl_transport.routes.route_short_name = '002'";
		$query = mysqli_real_escape_string($conn, $query);
		$queryResult = $conn->query($query);
		$locations = getBusLocations($queryResult);
		$conn->close();
		
		echo($locations);
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
		$locations = array();
		$json = "";
		error_log(print_r($queryResult), 3, 'error.txt');
		if ($queryResult) {
			while ($row = $queryResult->fetch_array(MYSQLI_NUM)) {
		        $locations[] = $row[0];
		    }
		    $json = json_encode($locations);
		}
		return $json;
	}
?>