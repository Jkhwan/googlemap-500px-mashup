$(document).ready(function () {
	var urlLat = '49.261226';
	var urlLong = '-123.11392628';
	var consumerKey = 'Ji9CYX99WEZ4A11GWcbQkwJ32MGDttQlsKBiMs35';
	var imageSize = '4';
	var radius = '1km';
	var rpp = '100';
	var url = 'https://api.500px.com/v1/photos/search?geo=' + urlLat + ',' + urlLong + ',' + radius + '&rpp=' + rpp + '&image_size=' + imageSize + '&consumer_key=' + consumerKey;
	
	$.getJSON(url, 
		function ( data ) {
			function Image(latitude, longitude, url) {
				this.latitude = latitude;
				this.longitude = longitude;
				this.url = url;
			};
			var imageCollection = [];
			console.log(data.photos);
			$( data.photos ).each( function	( index, photo) {
				var image = new Image(photo.latitude, photo.longitude, photo.image_url)
				imageCollection.push(image);			
			});
			console.log(imageCollection);

		}
)});
