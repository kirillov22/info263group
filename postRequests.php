<?php
	require_once("include/config.php");
	$conn = getConnection($hostname, $username, $password, $database);
	if ($conn->connect_error) {
		fatalError($conn->error);
		return;
	}
	
	if ($_POST['allRoutes']) {
		$query = 'SELECT DISTINCT route_short_name FROM akl_transport.routes ORDER BY route_short_name ASC;';
		$result = $conn->query($query);
		$routeArray = getAllRoutes($result);
		//$result->close;
		
		echo($routeArray);
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
			$js_array = json_encode($routes);
		}
		return $js_array;
	}
?>