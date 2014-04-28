var L = require('leaflet'),
    leafletStream = require('../');

L.Icon.Default.imagePath = 'http://leafletjs.com/dist/images';

window.onload = function() {
    var div = document.body.appendChild(document.createElement('div'));
    div.style.cssText = 'height:500px;';
    var map = L.map(div).setView([0, 0], 2);
    L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    var gj = L.geoJson().addTo(map);
    leafletStream.ajax('http://localhost:3000/points.geojson', gj)
        .on('end', function() {
        });
};
