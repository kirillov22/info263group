 /*
 * 
 */
function stringToArray(string) {
	string = string.slice(1, -1);
	var array = string.split(",");
	
	return array;
}


function routeQuery() {
	$.post('postRequests.php', {'allRoutes': true}, function(result) {
		populateRoutes(result);				
	});
}


//Use some jQuery to fill the select box in the html
function populateRoutes(response) {
	response = stringToArray(response);
	for (var i = 0; i < response.length; i++) {
		var value = response[i].slice(1, -1);
		$('#routeSelect').append('<option value="'+value+'">'+value+'</option>');
	}
}


function APIquery() {
	var queryRoute = $('#routeSelect').val();
	if (queryRoute != 'None') {
		$.post('postRequests.php', {'queryAPI': true,'route':queryRoute}, function(result) {
			if(result.length > 0) {
				extractLocations(result);
				$('#routeOutput').text('There are some busses on the route: '+ queryRoute + '. Click on a bus for more info!');
			} else {
				noBussesFound(queryRoute);
			}
		});
	}
}


function extractLocations(param) {
	var i;
	var len = param.length;
	refreshMap();
	for (i = 0; i < len; i++) {
		newmarker(param[i].lat, param[i].long, param[i].id, param[i].time);
	}
	
}


function noBussesFound(queryRoute) {
	refreshMap();
	$('#routeOutput').text('No busses found for route: ' + queryRoute);
	if ($('#autosizecb').prop('checked')) {
		infomap.setCenter(initialPoint);
		infomap.setZoom(15);
	}
}
