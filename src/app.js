const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        text: 'This is an halpful text',
        name: 'Gal'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    const city = req.query.address
    geocode (city,(error, {latitude,longitude,location}={}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
        if (error){
            return res.send({error})
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address

        })
        })
    })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404', {
        title: 'ERROR',
        errorText: 'help article not found',
        name: 'Gal'})
        
})

app.get('*',(req,res)=>{
    res.render('404', {
        title: 'ERROR',
        errorText: 'page not found',
        name: 'Gal'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})