$(function () {

	function initialize() {

		/*

		var geocoder = new google.maps.Geocoder();
		var address = "Vancouver, BC";
		var latitude=0, longtitude=0;

		geocoder.geocode( { 'address': address}, function(results, status) {
		  if (status == google.maps.GeocoderStatus.OK)
		  {
		      // do something with the geocoded result

		      latitude = results[0].geometry.location.nb;
		      longtitude = results[0].geometry.location.ob;
		      
		  }
		});*/

		var mapOptions = {
		  center: new google.maps.LatLng(49.261226, -123.1139268),
		  zoom: 8,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map(document.getElementById("map-canvas"),
		    mapOptions);

	}

	google.maps.event.addDomListener(window, 'load', initialize);

	var urlLat = '49.261226';
	var urlLong = '-123.11392628';
	var consumerKey = 'Ji9CYX99WEZ4A11GWcbQkwJ32MGDttQlsKBiMs35';
	var imageSize = '4';
	var radius = '1km';
	var rpp = '100';
	var url = 'https://api.500px.com/v1/photos/search?geo=' + urlLat + ',' + urlLong + ',' + radius + '&rpp=' + rpp + '&image_size=' + imageSize + '&consumer_key=' + consumerKey;
	
	function Image(latitude, longitude, url) {
		this.latitude = latitude;
		this.longitude = longitude;
		this.url = url;
	};

	$.getJSON(url, 
		function ( data ) {
			var imageCollection = [];

			$( data.photos ).each(function (index, photo) {
				var image = new Image(photo.latitude, photo.longitude, photo.image_url)
				imageCollection.push(image);			
			});
			console.log(imageCollection);

			$(imageCollection).each(function(index, pin) {
				var myLatlng = new google.maps.LatLng(pin.latitude, pin.longitude);
				var marker = new google.maps.Marker({

		      position: myLatlng,
		      map: map,
		      //title: 'Hello World!'
		  	});
			});

		}
)});
