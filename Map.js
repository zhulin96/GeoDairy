var map = L.map('map').setView([48.210033, 16.363449], 11);
var Basemap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
		id: 'mapbox.light'
	}).addTo(map);
var trajectory = L.geoJSON().addTo(map);
//var Morning = L.GeoJSON.AJAX("Morning.json")
$.ajax({
	dataType: "json",
	url: "../Morning.json",
	success: function(trajectory,data ){
		trajectory.addData(data);}
})

//var parisKievLL = [[48.8567, 2.3508], [50.45, 30.523333]];
//var marker1 = L.Marker.movingMarker(Morning.features.geometry.coordinates, [10]).addTo(map);
//L.polyline(parisKievLL).addTo(map);
	

	
