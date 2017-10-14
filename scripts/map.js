/*
JS writen by Gavin McGill
29/09/17

This file contains all the javascript that handles data on the map
*/
	
var allmarkers = [];
var allwindows = [];
var infomap;
var initialPoint = {lat: -36.84738,lng: 174.76173};


function initMap(){	
// this fucntion is called to initialise the map
    infomap = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: initialPoint
    });
	setInterval(APIquery,30000);
}

function clearwindows(){
	//closes all inforation windows
	for (var win = 0; win < allwindows.length; win ++){
		allwindows[win].close();
	}
}

function changemap(type){
	//changes the view type of the map to the specified parameter
	switch(type) {
    case 'roadmap':
	infomap.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        break;
    case 'terrain':
	infomap.setMapTypeId(google.maps.MapTypeId.TERRAIN);
        break;
	case 'hybrid':
	infomap.setMapTypeId(google.maps.MapTypeId.HYBRID);
        break;
	case 'satellite':
	infomap.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        break;
}
}


function newmarker(x,y,name,route) {
	/*
	Creates a new marker and places it on the map
	each marker takes 4 parameters latatude, longatude the buss name
	and the destionation time of that buss
	*/

	locations.push([name,x,y,route]);
	var myLatlng = {lat: x,lng: y}; 
	
	//create marker
	mark = new google.maps.Marker({
		position: myLatlng,
		map: infomap,
		icon: "media/bus.png",
		title: 'Double click to zoom'
	});
	
	//create information window
	var binfo = notify(mark.getPosition());
	var iw = new google.maps.InfoWindow({
		content: binfo
	});
	
	//keep track of markers and windows
	allmarkers.push(mark);
	allwindows.push(iw);
	
	//add click and double click events
	mark.addListener('click', function() {
		clearwindows();
		iw.open(infomap, this);
	});
	mark.addListener('dblclick', function() {
		infomap.setZoom(15);
		infomap.setCenter(this.getPosition());
	});
	
	//poisbly autocenter the map
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
	// clears all the markers on the map so new more recent ones cna be added
	
    for (var mind = 0; mind < allmarkers.length; mind++) {
        allmarkers[mind].setMap(null);
    }
	
	allmarkers = [];
	locations = []; 
}
	
function notify(loc) {
	/*
	returns a string of the infromation of a bus given its location.
	*/
	
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
