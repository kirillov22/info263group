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
	$('#routeSelect option[value="None"').remove();
	for (var i = 0; i < response.length; i++) {
		//DBG MSG:
		//console.log(response[i]);
		var value = response[i].slice(1, -1);
		$('#routeSelect').append('<option value="'+value+'">'+value+'</option>');
	}
}


function APIquery() {				
	$.post('postRequests.php', {'queryAPI': true}, function(result) {
		extractLocations(result);		
	});
}


function extractLocations(param) {
	var i;
	var len = param.length;
	console.log("LOL", len);
	console.log(param);
	console.log(typeof(param));
	for (i = 0; i < len; i++) {
		console.log('My group is filled with morons ' + JSON.parse(param[i]));
	}
}

