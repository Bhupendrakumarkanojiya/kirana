//alert('custom');
window.onload = getLocation();
var x = document.getElementById("#demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
		console.log(navigator);
    } else {
       console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
	console.log(position.coords.latitude+'/'+position.coords.longitude);
	
   // x.innerHTML = "Latitude: " + position.coords.latitude + 
   // "<br>Longitude: " + position.coords.longitude; 
}


