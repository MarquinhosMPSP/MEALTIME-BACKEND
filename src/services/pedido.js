module.exports = {
    calcularValorTotal(pedidos) {
        const valorTotal = pedidos.reduce((prev, curr) => prev += curr.preco, 0)
        return Number(valorTotal.toFixed(2))
    },
}