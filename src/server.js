const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const PORT = process.env.PORT || 3333

const app = express()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    app.use(cors());
    next();
})

app.use(express.json())
app.use(routes)

// notFound
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

// catch all
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ error: error.message})
})


app.listen(PORT, () =>  console.log('[API] Running...'))