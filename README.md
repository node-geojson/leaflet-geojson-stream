# leaflet-geojson-stream

[![Greenkeeper badge](https://badges.greenkeeper.io/tmcw/leaflet-geojson-stream.svg)](https://greenkeeper.io/)

![](http://i.imgur.com/lVF6xZl.gif)

Stream [GeoJSON](http://geojson.org/) features into a [Leaflet](http://leafletjs.com/)
layer.

## usage

With [browserify](https://github.com/substack/node-browserify)

    npm install --save leaflet-geojson-stream

Otherwise

    curl https://raw.github.com/tmcw/leaflet-geojson-stream/master/leafletgeojsonstream.js > leafletgeojsonstream.js

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

## build

    npm install
    npm run-script build

## How

A simple abstraction on top of [geojson-stream](https://github.com/tmcw/geojson-stream),
which is in turn just a bit of sugar on [JSONStream](https://github.com/dominictarr/JSONStream). Regular old
[XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) allows for partial replies
under the magical 'status code 3'. This doesn't use WebSockets or anything else fancy.

## Caveats

* Some servers will send huge chunks in their responses. This depends on a
  keep-alive connection with reasonable bites.
* The GeoJSON object returned by the server currently _must_ be a `FeatureCollection`
  at its root.
