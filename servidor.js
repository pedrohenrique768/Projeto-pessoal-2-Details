
const express = require("express")
const app = express()
const router = require("./routes/router")
const erros = require("./middlewares/verErros")

app.use(express.json())
app.use(router)
app.use((req, res) => {
    res.status(404).json("Rota não encontrada")
})
app.use(erros)
app.listen(3000, () => {
    console.log("Servidor: http://localhost:3000")
})
