// environment vars
require('dotenv').config()

// external libs
const express = require('express')
const cors = require('cors')

const routes = require('./routes')

const PORT = process.env.PORT || 3333

const app = express()

app.use(cors());

app.use(express.json())
app.use(routes)

// middlewares
app.use(require('./middlewares/headers'))
app.use(require('./middlewares/notFound'))
app.use(require('./middlewares/catchAll'))


app.listen(PORT, () =>  console.log('[API] Running...'))