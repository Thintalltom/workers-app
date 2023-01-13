const express = require('express')
const app = express()
const PORT = 5000
const cors = require('cors')
const dontenv = require('dotenv')
dontenv.config()

app.use(cors())


app.use('/workers', require('./api/workers'))
app.use('/newworker', require('./api/newworker'))
app.listen(process.env.PORT || PORT, () => {
    console.log('nOW ON PORT 5000')
})