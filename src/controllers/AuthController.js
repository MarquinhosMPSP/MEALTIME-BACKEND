const jwt = require('jsonwebtoken')
const db = require("../database")

module.exports = {
    async login(req, res, next) {
        try {
            const { login, senha, plataforma } = req.body

            if (login && senha) {
                const usuario = await db('usuario')
                    .where({ login, senha })
                    .leftJoin('restaurante', 'usuario.idRestaurante', 'restaurante.idRestaurante')
                    .select('usuario.idUsuario', 'usuario.nome', 'usuario.idPerfil', 'restaurante.idRestaurante', 'restaurante.nomeRestaurante')
                    .first()

                if (usuario && !usuario.idRestaurante && plataforma === 'web') {
                    return res.status(500).json({ message: 'você não possui acesso a plataforma web com essa conta!' })
                }

                if (usuario && plataforma === 'app') {
                    if ((usuario.idRestaurante && usuario.idPerfil !== 3) || (!usuario.idRestaurante && usuario.idPerfil !== 1)) {
                        return res.status(500).json({ message: 'você não possui acesso ao app com essa conta!' })
                    }
                }

                if (usuario) {
                    const token = jwt.sign({ usuario }, process.env.SECRET_KEY, { 
                        expiresIn: '1 day'
                    })

                    return res.json({ token, usuario })
                }
                return res.status(500).json({ message: 'login ou senha inválidos!' })
            }
            return res.status(500).json({ message: 'informe o login e a senha!' })
        } catch (error) {
            return next(error)
        }
    }
}