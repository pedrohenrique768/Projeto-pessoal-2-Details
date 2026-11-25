const express = require("express")
const router = express.Router()
const funcoes = require("../funcoes")

router.get("/", async (req, res) => {
    const atividades = await funcoes.listar("atividades.json")
    res.json(atividades)
})

router.get("/:id", async (req, res) => {
    const atividade = await funcoes.buscar("atividades.json", req.params.id)
    if (!atividade) {
        return res.status(404).json("Atividade não encontrada")
    }
    res.json(atividade)
})

router.post("/", async (req, res) => {
    const { descricao, dia, periodo, produtoId } = req.body
    const produto = await funcoes.buscar("produtos.json", produtoId)
    if (!produto) {
        return res.status(404).json("Produto não encontrado")
    }
    const atividade = await funcoes.adicionar("atividades.json", {descricao, dia, periodo, produtoId: Number(produtoId), realizada: false})
    res.status(201).json(atividade)
})

router.put("/:id", async (req, res) => {
    const { descricao, dia, periodo, produtoId, realizada } = req.body
    const resultado = await funcoes.editar("atividades.json", req.params.id, {descricao, dia, periodo, produtoId: Number(produtoId), realizada})
    if (!resultado) {
        return res.status(404).json("Atividade não encontrada")
    }
    res.json("Atividade atualizada")
})

router.patch("/:id/realizada", async (req, res) => {
    const resultado = await funcoes.editar("atividades.json", req.params.id, {
        realizada: true
    })
    if (!resultado) {
        return res.status(404).json("Atividade não encontrada")
    }

    res.json("Atividade marcada como realizada")
})

router.delete("/:id", async (req, res) => {
    const resultado = await funcoes.remover("atividades.json", req.params.id)
    if (!resultado) {
        return res.status(404).json("Atividade não encontrada")
    }
    res.json("Atividade excluída")
})

module.exports = router