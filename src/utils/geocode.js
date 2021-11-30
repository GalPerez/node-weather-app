const request = require('request')


const geocode = (adress,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ adress+'.json?access_token=pk.eyJ1IjoiZ2FscGUiLCJhIjoiY2t3NmNjamczMG9qNjJwcWxtMWFib244dCJ9.IZmA9bHz60cONTlhYsnNww&limit=1'

    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to loction service!')
        }else if (!body.features[0]){
            callback('Unable to find loction, try another serch.')
        }else{
            callback(undefined, {
                'latitude': body.features[0].center[1],
                'longitude': body.features[0].center[0],
                'location': body.features[0].place_name
            })
        }
        
    })
}



module.exports = geocode