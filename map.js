//https://stackoverflow.com/questions/47764862/how-to-display-google-maps-marker-using-ajax
//http://kml4earth.appspot.com/icons.html

var map;
var markersHeld = [];
var latlngbounds = new google.maps.LatLngBounds();
var infowindow = new google.maps.InfoWindow({
    content: "You are currently here"
});

function addMarker(latLng, icon, Name, content, content2, image) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,

        animation: google.maps.Animation.DROP,
        icon: icon
    });
    google.maps.event.addListener(marker, 'click', function() {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        for (var a = 0; a < markersHeld.length; a++) {
            markersHeld[a].setIcon("mapImages/blu-stars.png");
        }
        marker.setIcon("mapImages/grn-stars.png");

        setTimeout(function() {
            marker.setAnimation(null)
        }, 200);

        document.getElementById("markerDetails").innerHTML =

            "<img class='switch' src='images/switch.svg' alt='nintendo switch'><h3>" + Name + "</h3><br><img class='mapImage' src=" + image + " alt='store image'><br><br>";

        document.getElementById("Details").innerHTML = "<h4>About us</h4><br><br>" + content + "<br><br>" + content2;
    })
    markersHeld.push(marker);
}



function addShopMarkers() {
    $.getJSON('data/map.json', (mapData) => {


        $.each(mapData, (m, obj) => {
            //console.log("each loop");
            var latLng = new google.maps.LatLng({
                lat: obj.Lat,
                lng: obj.Long
            })
            addMarker(latLng, obj.icon, obj.Name, obj.content1, obj.content2, obj.image);

        })
    })
}

function addUserMarker(latLng, label) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: "mapImages/red-circle.png"
    });




    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    })

}

function showMap(latLng) {
    map = new google.maps.Map(document.getElementById('newMap'), {
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: true,
        overviewMapControl: true,
        rotateControl: true,
        zoom: 6,
    });
    addShopMarkers();
}


function getUserPosition() {
    function itWorks(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        //console.log('latitude: '+latitude);
        //console.log('longitude: '+longitude);
        var userLatLng = new google.maps.LatLng({
            lat: latitude,
            lng: longitude
        });
        showMap(userLatLng);
        var latLng = userLatLng;
        addUserMarker(latLng, "Your Location");




        var distance = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, latLng);
        //console.log(distance/1000+"km");
    }

    function itDoesntWork(error) {
        console.log('There is an error ' + error);
    }
    navigator.geolocation.getCurrentPosition(itWorks, itDoesntWork);
}

function init() {
    getUserPosition()
}

window.addEventListener("load", init, false);



