const connectToMongo = require('./db')
const express = require('express')

var cors = require('cors')

connectToMongo()
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

//available routes. yaha sare routes isiliye nai banaye taki kachra na faile management bhi chahie
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`MyNotebook backend listening on port ${port}`)
})

