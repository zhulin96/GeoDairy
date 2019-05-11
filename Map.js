var map = L.map('map').setView([48.210033, 16.363449], 13);
var Basemap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> Icon &copy; <a href="https://icons8.com/icon/64246/shopping-cart-promotion">Shopping Cart Promotion icon</a>'+
					'&copy;<a href="https://icons8.com/icon/108793/tableware">Tableware icon</a>'+
					'&copy;<a href="https://icons8.com/icon/113802/books">Books icon</a>',
		id: 'mapbox.light'
	}).addTo(map);
var Icon_morning = L.icon({
    iconUrl: "https://img.icons8.com/bubbles/50/000000/books.png",
    iconSize:   [50, 50]
});
var Icon_afternoon = L.icon({
    iconUrl: "https://img.icons8.com/clouds/100/000000/shopping-cart-promotion.png",
    iconSize:   [50, 50]
});
var Icon_evening = L.icon({
    iconUrl: "https://img.icons8.com/color/48/000000/tableware.png",
    iconSize:   [30, 30]
});
var url = ["https://raw.githubusercontent.com/zhulin96/GeoDiary/master/json/Morning.json","https://raw.githubusercontent.com/zhulin96/GeoDiary/master/json/Afternoon.json",
		"https://raw.githubusercontent.com/zhulin96/GeoDiary/master/json/Evening.json"];
function track_route(url){
	var track = [];
	var speed = [];
	$.ajax({
	dataType: "json",
	url: url,
	async: false,
	success: function(data){
			var List = [];
			List = data.features[0].geometry.coordinates;
			List.forEach(function(value) {
				var coords = [value[1],value[0]];
				track.push(coords);
				speed.push(value[2]-120);
			});
		}		
	});
	return {
        track: track,
		speed: speed
    };
}
// set route in sequence
var Route_morning = track_route(url[0]);
var Route_afternoon = track_route(url[1]);
var Route_evening = track_route(url[2]);
L.polyline(Route_morning.track,{color: 'yellow'}).addTo(map);
marker_morning= new L.Marker.movingMarker(Route_morning.track, Route_morning.speed,{autostart: true,icon: Icon_morning}).addTo(map);
marker_morning.bindPopup('<b>On the way to library. <br>It\'s time for studying</b>').openPopup();
marker_morning.on('end', function() {
	marker_morning.bindPopup('<h4>Morning</h4><b>Time-10:10 AM</b><br><b>Place-TU Vienna University Library</b>').openPopup();
	L.polyline(Route_afternoon.track,{color: 'blue'}).addTo(map);
	marker_afternoon= new L.Marker.movingMarker(Route_afternoon.track, Route_afternoon.speed,{autostart: true,icon: Icon_afternoon}).addTo(map);
	marker_afternoon.bindPopup('<b>Finished one-day lectures <br>I must go to buy some food for my weekend</b>').openPopup();
	marker_afternoon.on('end', function() {
		marker_afternoon.bindPopup('<h4>Afternoon</h4><b>Time-17:00PM</b><br><b>Place-Supermarket</b><br><video width="250" height="250" src="src/Shopping.mp4" controls></video>')
		.openPopup();
		L.polyline(Route_evening.track,{color: 'red'}).addTo(map);
		marker_evening= new L.Marker.movingMarker(Route_evening.track, Route_evening.speed,{autostart: true,icon: Icon_evening}).addTo(map);
		marker_evening.bindPopup('<b>I was informed to take my own tableware<br>I think the biggest plate is the best</b>').openPopup()
		marker_evening.on('end', function() {
			marker_evening.bindPopup('<h4>Evening</h4><b>Time-21:00PM</b><br><b>Place-Friends\' Dorm</b>').openPopup();
		})
	})
})
