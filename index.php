<?php
$active = "home";
require_once('include/header.php');
require_once("include/config.php");
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
		<div id="navbar">
		<h1> Inteli Bus</h1>
		<div id="ltab">lookup route</div>
			<select id="routeSelect">
				<option value="None">Please select a route</option>
			</select>
		</div>
		<div id="map"></div><br>
		<div id="testJSON">
			<p>Some test JSON should be output here after an API call</p>
		</div>	
		<script>
		    $(document).ready(function() {
					routeQuery();
					APIquery();
				});
		</script>
	</body>
</html>
<?php
require_once 'include/footer.php';
?>
