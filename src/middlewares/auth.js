const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) return res.status(401).json({ message: 'acesso não autorizado!' })

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'token inválido!' })
        // Salvando id do usuario no req
        req.data = decoded.usuario
        next()
    })
}