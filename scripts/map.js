/*
JS writen by Gavin McGill
29/09/17


the rest of the work can only be done when there is a line of code where the locations array
is updated and the with the latest details of the map.

*/
var locations = [  ['garys car', -33.950198, 151.259302, "on his way home"]

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

	var bounds = new google.maps.LatLngBounds();
		
	for (var i = 0; i < allmarkers.length; i++) {
		bounds.extend(allmarkers[i].getPosition());
	}
	infomap.fitBounds(bounds);
	newmarker(-33.490542, 149.374856, "southbound",'bus 1');
	newmarker(-31.755908, 151.696743, "Blue line",'bus 2');
	newmarker(-33.355908, 150.496743, "orbiter",'bus 3');
	newmarker(-32.155908, 152.696743, "northlands",'bus 4');
	newmarker(-32.455908, 150.686743, "route 66",'bus 5');
	setInterval(refreshMap, 30000);
  }

	function newmarker(x,y,name,route) {
	
		var payload = [name,x,y,route];
		locations.push(payload);
		var myLatlng = {lat: x,lng: y}; 
		
		mark = new google.maps.Marker({
			position: myLatlng,
			map: infomap,
			icon: "media/bus.png",
			title: 'Click to zoom'
		});
		
		var binfo = notify(mark.getPosition());
		var iw = new google.maps.InfoWindow({
			content: binfo
		});
		
		allmarkers.push(mark);
		
		mark.addListener('click', function() {
			iw.open(infomap, this);
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
	
function refreshMap(){
	
    for (var mind = 0; mind < allmarkers.length; mind++) {
        allmarkers[mind].setMap(null);
    }
	
	allmarkers = [];
	locations = []; 
	
	// please replace the following example code with by creating a for loop that adds new markers to the map.
	newmarker(-0, 0, "southbound",'bus 1');
	newmarker(-31.755908, 151.696743, "Blue line",'bus 2');
	newmarker(-33.355908, 150.496743, "orbiter",'bus 3');
	newmarker(-32.155908, 152.696743, "northlands",'bus 4');
	newmarker(-32.455908, 150.686743, "route 66",'bus 5');
	
}

	
	
	function notify(loc) {
		
		var name;
		var route;
		var testLatlng;
		
		for (var i = 0; i < locations.length; i ++) {
		
			testLatlng = [locations[i][1], locations[i][2]];
			
			if ((testLatlng[0].toString()).slice(0, 9) == (loc.toString()).slice(1, 10)){
			name = locations[i][0];
			route = locations[i][3];
			}
		}
		return "<b>"+name + "</b> <br>" + route + "<br>coordinates: " + loc;
	}
