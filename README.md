# leaflet-geojson-stream

![](http://i.imgur.com/lVF6xZl.gif)

Stream [GeoJSON](http://geojson.org/) features into a [Leaflet](http://leafletjs.com/)
layer.

## api

### `lgs.ajax(url: string, layer: L.geoJson instance)`

Request all features from a given `url` with [hyperquest](https://github.com/substack/hyperquest)
and add them incrementally to `layer`. Returns a stream of feature objects
that also emits `end` on completion.

### `lgs.layerPipe(layer: L.geoJson instance)`

Given a `L.geoJson` instance, return a writable stream that accepts GeoJSON Feature
objects.

## example

```js
var leafletStream = require('leaflet-geojson-stream'),
    map = L.map('map').setView([0, 0], 2),
    gj = L.geoJson().addTo(map);

leafletStream.ajax('/points.geojson', gj)
    .on('end', function() {
        alert('all done!');
    });
```

To run the prepackaged example:

    npm install
    cd example
    node server.js

And open http://localhost:3000/

## How

A simple abstraction on top of [geojson-stream](https://github.com/tmcw/geojson-stream),
which is in turn just a bit of sugar on [JSONStream](https://github.com/dominictarr/JSONStream).
