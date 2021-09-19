require('dotenv').config()
const express = require('express')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls

const rovers = ['curiosity','spirit','opportunity']

// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
        .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})


app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
        .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

const fetchRoverData = () => { 
    rovers.forEach((rover)=>{
        app.get(`/${rover}`, async (req, res) => {
            try {
                let roverImages = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${process.env.API_KEY}`)
                .then(res => res.json())
                res.send({ roverImages })
            } catch (err) {
                console.log('error:', err);
            }
        })
    })

}

fetchRoverData()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))