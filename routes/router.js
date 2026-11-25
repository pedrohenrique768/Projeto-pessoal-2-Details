
const express = require("express")
const router = express.Router()
const produtos = require("./produtos")
const atividades = require("./atividades")

router.use("/produtos", produtos)
router.use("/atividades", atividades)

module.exports = router