const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const PORT = process.env.PORT || 3333

const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
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