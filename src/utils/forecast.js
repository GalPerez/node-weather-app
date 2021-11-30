const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9945e8456d62e70ff6957431e1f8b7ac&query='+latitude+','+longitude

    request({ url, json: true }, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service!')
        }else if(body.error){
            callback('Unable to find loction!')
        }else{
            callback(undefined,'The temperature now is '+body.current.temperature+' degrees and it feels like '+body.current.feelslike+' degrees out')
        }
    })
}

module.exports = forecast