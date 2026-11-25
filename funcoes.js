
const fs = require("fs/promises")

async function listar(arquivo) {
    const dados = await fs.readFile(arquivo, "utf8")
    return JSON.parse(dados)
}

async function salvar(arquivo, dados) {
    await fs.writeFile(arquivo, JSON.stringify(dados, null, 2))
}

async function buscar(arquivo, id) {
    const registros = await listar(arquivo)
    return registros.find(a => a.id === Number(id))
}

async function adicionar(arquivo, dados) {
    const registros = await listar(arquivo)
    let id = 1
    for (let i = 0; i < registros.length; i++) {
        if (registros[i].id >= id) {
            id = registros[i].id + 1
        }
    }
    dados.id = id
    registros.push(dados)
    await salvar(arquivo, registros)
    return dados
}

async function editar(arquivo, id, dados) {
    const registros = await listar(arquivo)
    const indice = registros.findIndex(a => a.id === Number(id))
    if (indice === -1) {
        return false
    }
    const campos = Object.keys(dados)
    for (let i = 0; i < campos.length; i++) {
        registros[indice][campos[i]] = dados[campos[i]]
    }
    await salvar(arquivo, registros)
    return true
}

async function remover(arquivo, id) {
    const registros = await listar(arquivo)
    const resultado = registros.filter(a => a.id !== Number(id))
    if (resultado.length === registros.length) {
        return false
    }
    await salvar(arquivo, resultado)
    return true
}

module.exports = {listar, buscar, adicionar, editar, remover}