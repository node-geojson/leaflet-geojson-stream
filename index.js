var hyperquest = require('hyperquest'),
    through = require('through'),
    geojsonStream = require('geojson-stream');

module.exports.ajax = ajax;
module.exports.layerPipe = layerPipe;

function ajax(url, layer) {
    return hyperquest(url)
        .pipe(geojsonStream.parse())
        .pipe(layerPipe(layer));
}

function layerPipe(layer) {
    return through(function(d) {
        if (layer.addData !== undefined) layer.addData(d);
        this.queue(d);
    });
}
