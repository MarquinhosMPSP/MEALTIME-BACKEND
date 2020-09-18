const moment = require('moment')

module.exports = {
    getFirstMinute(date) {
        return moment(date).format('YYYY-MM-DD') + 'T00:00:00.000Z'
    },
    getLastMinute(date) {
        return moment(date).add(23, 'h').add(59, 'm').add(59, 's').toISOString()
    },
    calculateTotalValue(arr, target) {
        const totalValue = arr.reduce((prev, curr) => prev += curr[target], 0)
        return Number(totalValue.toFixed(2))
    },
}