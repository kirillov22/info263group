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
		$locations = apiCall($APIKey, $url, $trip_array);
		processJSON($locations);
		//print_r(json_decode($locations[0])->response);
		//$locations = json_encode($locations);
		//header('Content-Type: application/json');
		//echo($locations);
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
		for ($i = 0; $i < $len; $i++) {
			$data = json_decode($json[$i]);
			//print_r('Dudududu ====================== ' . $data->response->entity);
			$busData = $data->response->entity;
			
			for ($j = 0; $j < count($busData); $j++) {
				$id = $busData[$j]->vehicle->vehicle->id;
				//print_r($busData[$j]->vehicle->vehicle->id);
				array_push($busses, array($id => array(123, 345)));
			}
			/*
			
			print_r($data->response);
			print_r('Dudududu ====================== ' . $data->response->entity);
			*/
		}
		print_r($busses);
	}
?>