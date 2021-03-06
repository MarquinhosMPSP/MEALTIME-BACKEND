const jwt = require('jsonwebtoken')
const db = require("../database")

module.exports = {
    async login(req, res, next) {
        try {
            const { login, senha } = req.body

            if (login && senha) {
                const usuario = await db('usuario')
                    .where({ login, senha })
                    .join('restaurante', 'usuario.idRestaurante', 'restaurante.idRestaurante')
                    .select('usuario.idUsuario', 'usuario.nome', 'restaurante.idRestaurante', 'restaurante.nomeRestaurante')
                    .first()
                    
                if (usuario) {
                    const token = jwt.sign({ usuario }, process.env.SECRET_KEY, { 
                        expiresIn: '1 day'
                    })

                    return res.json({ token, usuario })
                }
                return res.status(500).json({ message: 'login ou senha inválidos!' })
            }
            return res.json({ message: 'informe o login e a senha!' })
        } catch (error) {
            return next(error)
        }
    }
}