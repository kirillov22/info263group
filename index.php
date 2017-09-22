<?php
$active = "home";
require_once('include/header.php');
require_once("include/config.php");

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
	fatalError($conn->connect_error);
	return;
}

function displayAllRoutes($conn) {
	$myArray = array();
	$query = 'SELECT DISTINCT route_short_name FROM akl_transport.routes;';
	$result = $conn->query($query);
	
	if (!$result) {
		echo('Uhh ohh. Error to the database. Please ask Rick Sanchez for more info!' . '<br>');
		fatalError($conn->error);
	}
	else {
		while ($row = $result->fetch_array(MYSQLI_ASSOC))
	    {
	        $myArray[] = $row['route_short_name'];
	    }
	    $result->close();
	    /*for ($i = 0; $i < count($myArray); $i++) {
	    	echo($myArray[$i] . '<br>');
	    }*/
	}
	$js_array = json_encode($myArray);
	
	return $myArray;
}

echo "it's actually GNU/Linux" . "<br>";
echo "WOWEEEEE LOOK AT ME IM MR MEESEEKS" . "<br>";
echo "I'm Rickle Pick!. Morty look at me ive turned myself into a Rickle" . "<br>";
$myArray = array();

/*
echo "<select>";
	for ($i = 0; $i < count($myArray); $i++) {
		echo "<option value='".$myArray[$i]."'>".$myArray[$i]."</option>";
	}
echo "</select>";
*/


//displayAllRoutes($conn);
?>
<html>
	<head>
		<script async defer
		  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0Ln7RlpdUdfz7ZBc331XtKX3XOa4KVW8&callback=initMap">
		</script>
		<script src="scripts/map.js"></script>
		<script src="scripts/scripts.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	</head>
	<body>
		<div style="width:100%;height:100px;background-color:#424242;">
		<div style="color:white;">lookup route</div>
			<select id="routeSelect">
				<option value="None">Please select a route</option>
			</select>
		</div><br>
		<div id="map"></div>
		<script>
		    $(document).ready(function() {
				var result = $.post("postRequests.php", {"allRoutes": true}, function() {
						alert('success');
						//console.log(result);
						console.log(result.responseText);					
					}
		    )});
		</script>
	</body>
</html>
<?php
require_once 'include/footer.php';
?>
