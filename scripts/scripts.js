//Use some jQuery to fill the select box in the html
function stringToArray(string) {
	string = string.slice(1, -1);
	string = string.split(",");
	
	return string;
}


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
		console.log('DBG: JSON should ouput');
		console.log(result);
	});	
}

