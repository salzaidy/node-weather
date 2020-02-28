const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Shaker Alzaidy"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Shaker Alzaidy"
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        message: "this is message help",
        title: "Help",
        name: "Shaker Alzaidy"
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'An address must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) { 
                return res.send({ error }) // same but differenet way
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    });
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: 'Help article not found',
        name: "Shaker Alzaidy"
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: 'Page not found',
        name: "Shaker Alzaidy"
    });
})


// listening to the port
app.listen(3000, () => {
    console.log('server is running on port 3000');
})
