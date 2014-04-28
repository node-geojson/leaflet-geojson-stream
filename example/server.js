var express = require('express'),
    browserify = require('browserify'),
    app = express();

app.get('/', function(req, res) {
    res.send('<html><head><link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.css" /></head><body><script src="bundle.js"></script></html>');
});

app.get('/bundle.js', function(req, res) {
    var b = browserify();
    b.add('./client.js');
    b.bundle().pipe(res);
});

app.get('/points.geojson', function(req, res) {
    res.write('{"type":"FeatureCollection","features":[');
    var i = 0, die = 0;
    function send() {
        if (++i > 20) {
            res.write(JSON.stringify(randomFeature()) + '\n,\n');
            i = 0;
        } else {
            // it seems like writing newlines here causes the buffer to
            // flush
            res.write('\n');
        }
        if (die++ > 1000) {
            res.write(JSON.stringify(randomFeature()));
            res.write(']');
            res.end();
            return;
        }
        setTimeout(send, 10);
    }
    send();
});

app.listen(3000);
console.log('open http://localhost:3000');

function randomFeature() {
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [
                (Math.random() - 0.5) * 360,
                (Math.random() - 0.5) * 180
            ]
        },
        properties: {}
    };
}
