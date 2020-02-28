const request = require("request");


const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1e90dbbef27811a6af36424539555a44/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude);
    
    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to weather service');
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            callback(undefined, 
                body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain"
            );
        }
    });
};


module.exports = forecast;