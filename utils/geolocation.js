const https = require('https');

module.exports = {
    googleGeo: (key, address, cb) => {
        url = 'https://maps.googleapis.com/maps/api/geocode/json'
        https.get(url + '?address= ' + address + '&key=' + key, (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                data = JSON.parse(data)
                if (data.results.length == 0) cb(null, {error: 'no address found'})
                coords = {
                    lng: data.results[0].geometry.location.lng,
                    lat: data.results[0].geometry.location.lat
                }                
                cb(coords, null)
            });

        }).on("error", (err) => {
            cb(null, {error: err.message})
        });
    }
}