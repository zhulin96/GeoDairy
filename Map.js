var map = L.map('map').setView([48.210033, 16.363449], 13);
var Basemap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
		id: 'mapbox.light'
	}).addTo(map);
var Lin = L.icon({
    iconUrl: 'src/Lin.jpg',
    iconSize:   [50, 50], 
    //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var trajectory = L.geoJSON().addTo(map);
var track = [];
var speed = [];
var marker_Lin;
function myFunction(value) {
  var coords = [value[1],value[0]];
  track.push(coords);
  speed.push(value[2]);
}
//List.forEach(myFunction);
$.ajax({
	dataType: "json",
	url: "https://raw.githubusercontent.com/zhulin96/GeoDiary/master/Morning.json",
	success: function(data){
		trajectory.addData(data);
		var List = [];
		//var track = [];
		List = data.features[0].geometry.coordinates;
		List.forEach(myFunction);
		marker_Lin= L.Marker.movingMarker(track, speed,{autostart: true, icon: Lin}).addTo(map);
		marker_Lin.on('end', function() {
			marker1.bindPopup('<b>10:07 AM</b><br>Library: <a target="\\blanck" href="https://github.com/ewoken/Leaflet.MovingMarker"><img src="github.png"></a>', {closeOnClick: false})
			.openPopup();
		});
		}
});

//var marker1 = L.Marker.movingMarker(line, [1]).addTo(map);
//console.log(track[0]);
//var parisKievLL = [[48.8567, 2.3508], [50.45, 30.523333]];

	
