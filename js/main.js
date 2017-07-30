// Confirmation about getting location
if (confirm("Do you agree to take you position?")==true) {
    getLocation();
}

var map;
var infowindow;
var maps = [];
var latLng1;
var mCur;

// Get location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initMap);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Generating location map and making search for local ATMs
function initMap(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    latLng1 = new google.maps.LatLng(latitude, longitude);

    var pyrmont = {lat: latitude, lng: longitude};

    map = new google.maps.Map( {
        center: pyrmont,
        zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch({
        location: pyrmont,
        //radius: 500,
        rankBy: google.maps.places.RankBy.DISTANCE,
        type: ['atm'],
        keyword:  mCur
    }, callback);
}

// Generating list off all markers (with max of 10)
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < 10; i++) {

            createMarker(results[i], i);

        }
    }
}

// Calculate distance
var d;
var rad = function(x) {
    return x * Math.PI / 180;
};
var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat() - p1.lat());
    var dLong = rad(p2.lng() - p1.lng());
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    d = R * c;
    d = Math.round(d);
    return d; // returns the distance in meter
};

// Creating markers and html
function createMarker(place, i) {

    //var latitude2 = place.geometry.location.lat();
    //var longitude2 = place.geometry.location.lng();
    var latLng2 = place.geometry.location;

    getDistance(latLng1, latLng2);

    var div = document.getElementById("location");
    div.innerHTML += '<li value="' + d + '" class="markerLi"><a href="#map' + i + '"  data-toggle="tab">' + place.name + '<span>' + d + 'm</span></a></li>';


    // Create html
    var mapDiv = document.createElement("div");
    mapDiv.setAttribute("id", "map" + i);
    mapDiv.setAttribute("role", "tabpanel");
    mapDiv.className = "marker tab-pane";
    var mapDiv2 = document.createElement("div");
    mapDiv2.setAttribute("id", "maps" + i);
    mapDiv2.className = "maps";
    var body = document.getElementsByTagName("ol")[0];
    body.appendChild(mapDiv);
    body.appendChild(mapDiv2);

    // Create maps
    maps[i] = new google.maps.Map(mapDiv2, {
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        streetViewControl: false,
        zoomControl: false,
        center: place.geometry.location,
        zoom: 15
    });

    // Create markers
    var marker = new google.maps.Marker({
        map: maps[i],
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(maps[i], this);
    });
}

// Sort locations by distance
function ascDesc() {

    var $markerList = $('#location');

    if ($markerList.hasClass("desc")) {
        $markerList.find('.markerLi').sort(function (a, b) {
            return +a.value - +b.value;
        }).appendTo($markerList);
        $markerList.removeClass("desc");
    } else {
        $markerList.find('.markerLi').sort(function (a, b) {
            return +b.value - +a.value;
        }).appendTo($markerList);
        $markerList.addClass("desc");
    }
}

function multiCur () { // Not working - if work change to prompt

    if (confirm("Only telenor")==true) {

        document.getElementById("location").innerHTML = '';
        document.getElementById("locationM").innerHTML = '';

        mCur = "Telenor";
        getLocation();
    }
}
