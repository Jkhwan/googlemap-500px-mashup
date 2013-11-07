$(function () {

	function initialize() {

		//Using getElementById bc of GoogleMaps documentation
		var mapDiv = document.getElementById('map-canvas');

		var mapOptions = {
		  center: new google.maps.LatLng(49.261226, -123.1139268),
		  zoom: 8,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map(document.getElementById("map-canvas"),
		    mapOptions);

		google.maps.event.addDomListener(mapDiv, 'mouseup', plot500);
		plot500();
	}

	google.maps.event.addDomListener(window, 'load', initialize);

	var markers = [];
	var urlLat = '49.261226';
	var urlLong = '-123.11392628';
	var consumerKey = 'Ji9CYX99WEZ4A11GWcbQkwJ32MGDttQlsKBiMs35';
	var imageSize = '4';
	var radius = '50km';
	var rpp = '100';
	var url = '';
	
	function Image(latitude, longitude, url, description) {
		this.latitude = latitude;
		this.longitude = longitude;
		this.description = description;
		this.url = url;
	};

	var clearMarkers = function() {
		for (var i = 0, size = markers.length; i < size; i++) {
			markers[i].setMap(null);
		}
	};

	var plot500 = function() {
		urlLat = map.getCenter().nb;
		urlLong = map.getCenter().ob;
		console.log(urlLat);
		console.log(urlLong);
		url = 'https://api.500px.com/v1/photos/search?geo=' + urlLat + ',' + urlLong + ',' + radius + '&rpp=' + rpp + '&image_size=' + imageSize + '&consumer_key=' + consumerKey;
		console.log(url);
		
		$.getJSON(url, 
			function ( data ) {
				var imageCollection = [];

				$( data.photos ).each(function (index, photo) {
					var image = new Image(photo.latitude, photo.longitude, photo.image_url, photo.description)
					imageCollection.push(image);			
				});
				console.log(imageCollection);

				if (markers != null) {
					clearMarkers();
				}

				$(imageCollection).each(function(index, pin) {
					var myLatlng = new google.maps.LatLng(pin.latitude, pin.longitude);
					var marker = new google.maps.Marker({

				      position: myLatlng,
				      map: map,
				      title: pin.description
			  		});
			  		markers.push(marker);
				});

			}
		)
	}
	
});
