
function verErros(erro, req, res, next) {
    console.log(erro.message)

    res.status(400).json({
        mensagem: erro.message
    })
}

module.exports = verErros
