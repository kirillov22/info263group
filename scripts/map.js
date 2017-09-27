/*
function initMap() {
var myLatLng = {lat: -25.363, lng: 131.044};

var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 4,
  center: myLatLng
});

var marker = new google.maps.Marker({
  position: myLatLng,
  map: map,
  title: 'Hello World!'
});
}
*/

function notify(loc) {
			
	var name;
	var route;
	var testLatlng;
	
	for (var i = 0; i < locations.length; i ++) {
	
		testLatlng = [locations[i][1], locations[i][2]];
		
		if ((testLatlng[0].toString()).slice(0, 9) == (loc.toString()).slice(1, 10)){
		// ***********caution*********** 
		// if if two busses in the same route have the same latitude (to 7 dp) they a random one will be selected
		// this needs to be fixed by checking for the corect longditude
		name = locations[i][0];
		route = locations[i][3];
		}
	}
	
	return name + " <br>" + route + "<br>coordinates: " + loc;
}

var locations = [
	['bus 2', -33.890542, 151.274856, "route 66"],
	['bus 96', -33.923036, 151.259052, "northlands to UC"],
	['greyhound 6', -34.028249, 151.157507, "Orbiter"],
	['leopard bus 4', -33.80010128657071, 151.28747820854187, "Blue line"],
	['garys car', -33.950198, 151.259302, "on his way home"],
	['Kirill', -33.993230, 151.176767, "Trying to go swimming"]
];
	
function initMap(){
	var myLatlng = {lat: locations[0][1],lng: locations[0][2]}; 
	
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 11,
	  center: myLatlng
	});
	
	var marker;
	
	for (var i = 0; i < locations.length; i++) {
		myLatlng = {lat: locations[i][1],lng: locations[i][2]}; 
		marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			title: 'Double click to zoom. Single click for info.'
		});
				
		marker.addListener('click', function() {
			binfo = notify(this.getPosition());
			//iw.setContent(binfo);
			//iw.open(map, this);
			infoWindow.setContent(notify(this.getPosition()));
			infoWindow.open(map, this);
		});
				
		marker.addListener('dblclick', function() {
			map.setZoom(13);
			map.setCenter(this.getPosition());
		});
		
		var infoWindow = new google.maps.InfoWindow({
			content: 'Uh-oh'
		});

	}
}

