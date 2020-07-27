const axios = require('axios')

module.exports = {
    async notifyAll(event, body) {
        try {
            const result = await axios.post('http://localhost:3000/sendAll', { event, body })
            return result.data
        } catch (error) {
            console.error(error)
        }
    },
    async notifyOne(event, body, target) {
        try {
            const result = await axios.post('http://localhost:3000/sendOne', { event, body, target })
            return result.data
        } catch (error) {
            console.error(error)
        }
    },
    async notifySome(event, body, targets) {
        try {
            const result = await axios.post('http://localhost:3000/sendSome', { event, body, targets })
            return result.data
        } catch (error) {
            console.error(error)
        }
    },
}