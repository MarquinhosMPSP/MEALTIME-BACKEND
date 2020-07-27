const axios = require('axios')

module.exports = {
    async notifyAll(event, body) {
        try {
            const result = await axios.post(process.env.NOTIFICATION_URL + '/sendAll', { event, body })
            return result.data
        } catch (error) {
            console.error(error)
        }
    },
    async notifyOne(event, body, target) {
        try {
            const result = await axios.post(process.env.NOTIFICATION_URL + '/sendOne', { event, body, target })
            return result.data
        } catch (error) {
            console.error(error)
        }
    },
    async notifySome(event, body, targets) {
        try {
            const result = await axios.post(process.env.NOTIFICATION_URL + '/sendSome', { event, body, targets })
            return result.data
        } catch (error) {
            console.error(error)
        }
    },
}