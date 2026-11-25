const express = require("express")
const router = express.Router()
const funcoes = require("../funcoes")

router.get("/", async (req, res) => {
    const produtos = await funcoes.listar("produtos.json")
    res.json(produtos)
})

router.get("/:id", async (req, res) => {
    const produto = await funcoes.buscar("produtos.json", req.params.id)
    if (!produto) {
        return res.status(404).json("Produto não encontrado")
    }
    res.json(produto)
})

router.post("/", async (req, res) => {
    const { nome, marca } = req.body
    const produto = await funcoes.adicionar("produtos.json", {nome, marca})
    res.status(201).json(produto)
})

router.put("/:id", async (req, res) => {
    const { nome, marca } = req.body
    const resultado = await funcoes.atualizar("produtos.json", req.params.id, {nome, marca})
    if (!resultado) {
        return res.status(404).json("Produto não encontrado")
    }
    res.json("Produto atualizado")
})

router.delete("/:id", async (req, res) => {
    const resultado = await funcoes.remover("produtos.json", req.params.id)
    if (!resultado) {
        return res.status(404).json("Produto não encontrado")
    }
    res.json("Produto excluído")
})

module.exports = router