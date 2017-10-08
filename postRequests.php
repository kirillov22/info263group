<?php
	require_once("include/config.php");
	require_once("requests.php");
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
		$param = 'CTY';
		$query = "SELECT DISTINCT trip_id FROM trips, routes WHERE routes.route_id = trips.route_id AND routes.route_short_name = '". $param ."'";
		$result = $conn->query($query);
		$trips = getBusLocations($result);
		$conn->close();
		
		$trip_array = array("tripid" => $trips);
		$apiJSON = apiCall($APIKey, $url, $trip_array);
		$busArray = processJSON($apiJSON);
		$busJSON = json_encode($busArray);
		header('Content-Type: application/json');
		echo($busJSON);
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
		return $trips;
	}
	
	function processJSON($json) {
		$busses = array();
		$len = count($json);
		//Loop through trips on a route
		for ($i = 0; $i < $len; $i++) {
			$data = json_decode($json[$i]);
			//Check to see if a bus is present on the trip
			if (is_object($data->response)) {
				$busData = $data->response->entity;
				//Loop through busses on the trip
				for ($j = 0; $j < count($busData); $j++) {
					$id = $busData[$j]->vehicle->vehicle->id;
					$lat = $busData[$j]->vehicle->position->latitude;
					$long = $busData[$j]->vehicle->position->longitude;
					array_push($busses, array($id => array($lat, $long)));
				}
			}
		}
		return($busses);
	}
?>