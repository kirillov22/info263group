/*
JS writen by Gavin McGill yeah and its trash
29/09/17


the rest of the work can only be done when there is a line of code where the locations array
is updated and the with the latest details of the map.

*/
	
var allmarkers = [];
var infomap;
var initialPoint = {lat: -36.84738,lng: 174.76173};


function initMap(){	
    infomap = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: initialPoint
    });
	
	setInterval(APIquery,30000);
}


function newmarker(x,y,name,route) {

	locations.push([name,x,y,route]);
	var myLatlng = {lat: x,lng: y}; 
	
	mark = new google.maps.Marker({
		position: myLatlng,
		map: infomap,
		icon: "media/bus.png",
		title: 'Double click to zoom'
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
		infomap.setZoom(15);
		infomap.setCenter(this.getPosition());
	});
	
	
	var autosize = document.getElementById("autosizecb").checked;
	if (autosize) {
	
		var bounds = new google.maps.LatLngBounds();
			
		for (var i = 0; i < allmarkers.length; i++) {
			bounds.extend(allmarkers[i].getPosition());
		}
		infomap.fitBounds(bounds);
	}
	
}



	
function refreshMap(){
	
    for (var mind = 0; mind < allmarkers.length; mind++) {
        allmarkers[mind].setMap(null);
    }
	
	allmarkers = [];
	locations = []; 
	
	// please replace the following example code with by creating a for loop that adds new markers to the map.
}
	
function notify(loc) {
	
	var name;
	var time;
	var testLatlng;
	
	for (var i = 0; i < locations.length; i ++) {
	
		testLatlng = [locations[i][1], locations[i][2]];
		
		if ((testLatlng[0].toString()).slice(0, 9) == (loc.toString()).slice(1, 10)){
		name = locations[i][0];
		time = locations[i][3];
		}
	}
	return "<b>Bus id: "+name + "</b> <br>Trip start time: " + time + "<br>Co-ordinates: " + loc;
}
