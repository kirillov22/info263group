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
var locations = [
  ['bus 2', -33.890542, 151.274856, "route 66"],
  ['bus 96', -33.923036, 151.259052, "northlands to UC"],
  ['greyhound 6', -34.028249, 151.157507, "Orbiter"],
  ['leopard bus 4', -33.80010128657071, 151.28747820854187, "Blue line"],
  ['garys car', -33.950198, 151.259302, "on his way home"]
	];
	
var allmarkers = [];
var infomap;
	

function initMap(){
	var myLatlng = {lat: locations[0][1],lng: locations[0][2]}; 
	
    infomap = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: myLatlng
    });
	
	//What does this code do???
	var marker;
	var binfo = "This is a Bus";
	var iw = new google.maps.InfoWindow({
		content: binfo
	});

	for (var i = 0; i < locations.length; i++) {
		
		myLatlng = {lat: locations[i][1],lng: locations[i][2]}; 
		marker = new google.maps.Marker({
			position: myLatlng,
			map: infomap,
			title: 'Click to zoom'
		});
		allmarkers.push(marker);
		
		marker.addListener('click', function() {
			binfo = notify(this.getPosition());
			iw.setContent(binfo);
			iw.open(infomap, this);
		});
		
		marker.addListener('dblclick', function() {
			infomap.setZoom(13);
			infomap.setCenter(this.getPosition());
			newmarker();
		});
		
		
	}
	var bounds = new google.maps.LatLngBounds();
		
	for (var i = 0; i < allmarkers.length; i++) {
		bounds.extend(allmarkers[i].getPosition());
	}
	infomap.fitBounds(bounds);
	
	newmarker(-33.890542, 149.374856, "southbound",'bus 3');
	newmarker(-33.755908, 150.696743, "penrith express",'bus 4');
  }

	function newmarker(x,y,name,route) {
	
		var payload = [name,x,y,route];
		locations.push(payload);
		var myLatlng = {lat: x,lng: y}; 
		
		mark = new google.maps.Marker({
			position: myLatlng,
			map: infomap,
			title: 'Click to zoom'
		});
		
		var binfo = notify(mark.getPosition());
		var iw = new google.maps.InfoWindow({
			content: binfo
		});
		
		allmarkers.push(mark);
		
		mark.addListener('click', function() {
			//When will Gavin learn about scope...
			iw.open(infomap, this);
			//Most likely never...
			//Looks like I gotta re-write this...
		});
		
		mark.addListener('dblclick', function() {
			infomap.setZoom(13);
			infomap.setCenter(this.getPosition());
		});
		
		
		var bounds = new google.maps.LatLngBounds();
		
		for (var i = 0; i < allmarkers.length; i++) {
		 bounds.extend(allmarkers[i].getPosition());
		}
		infomap.fitBounds(bounds);
		
	}
	
	
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
		return "<b>"+name + "</b> <br>" + route + "<br>coordinates: " + loc;
	}
