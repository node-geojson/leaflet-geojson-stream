geojsonstream.min.js: geojsonstream.js
	uglifyjs leafletgeojsonstream.js -c -m > leafletgeojsonstream.min.js

geojsonstream.js: index.js
	browserify -s leafletGeojsonStream index.js > leafletgeojsonstream.js
