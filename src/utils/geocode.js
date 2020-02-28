const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FsemFpZHkiLCJhIjoiY2s2dGtjNG9kMDAyejNnbXJneGFhNHF0ZyJ9.xT-z4P0_ew6LLzeezYFYXg&limit=1';

    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to weather services');
        } else if (body.features.length === 0) {
            callback('Unable to find location, try again with different search');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
};


module.exports = geocode;