(() => {
    const db = require("../database")
    const CronJob = require('cron').CronJob
    const job = new CronJob('0 */1 * * * *', async() => {
        await db('reserva')
            .where('status', 'aceita')
            .where('dataReserva ', '<=', new Date().toISOString())
            .update({ status: 'ativa' })
    })
    job.start()
})()