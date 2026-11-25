
const prompt = require("prompt-sync")()
const funcoes = require("./funcoes")

async function cadastrarProduto() {
    const nome = prompt("Nome do produto: ")
    const marca = prompt("Marca: ")
    await funcoes.adicionar("produtos.json", {nome, marca})
    console.log("Produto cadastrado")
}

async function listarProdutos() {
    const produtos = await funcoes.listar("produtos.json")
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado")
    }
    produtos.forEach(pro => {
        console.log("ID:", pro.id)
        console.log("Nome:", pro.nome)
        console.log("Marca:", pro.marca)
    })
}

async function cadastrarAtividade() {
    const descricao = prompt("Descrição do cuidado: ")
    const dia = prompt("Dia da semana: ")
    const periodo = prompt("Período (manha/noite): ")
    const produtoId = Number(prompt("ID do produto: "))
    const produto = await funcoes.buscar("produtos.json", produtoId)
    if (!produto) {
        console.log("Produto não encontrado")
        return
    }
    await funcoes.adicionar("atividades.json", {descricao, dia, periodo, produtoId, realizada: false})
    console.log("Atividade cadastrada")
}

async function listarAtividades() {
    const atividades = await funcoes.listar("atividades.json")
    if (atividades.length === 0) {
        console.log("Nenhuma atividade cadastrada")
    }
    atividades.forEach(ati => {
        console.log("ID:", ati.id)
        console.log("Descrição:", ati.descricao)
        console.log("Dia:", ati.dia)
        console.log("Período:", ati.periodo)
        console.log("Produto ID:", ati.produtoId)
        console.log("Realizada:", ati.realizada)
    })
}

async function buscarAtividade() {
    const id = Number(prompt("ID da atividade: "))
    const atividade = await funcoes.buscar("atividades.json", id)
    if (!atividade) {
        console.log("Atividade não encontrada")
    } else {
        console.log(atividade)
    }
}

async function editarAtividade() {
    const id = Number(prompt("ID da atividade: "))
    const atividade = await funcoes.buscar("atividades.json", id)
    if (!atividade) {
        console.log("Atividade não encontrada")
        return
    }
    const descricao = prompt("Nova descrição: ")
    const dia = prompt("Novo dia: ")
    const periodo = prompt("Novo período: ")
    const produtoId = Number(prompt("Novo ID do produto: "))
    const produto = await funcoes.buscar("produtos.json", produtoId)
    if (!produto) {
        console.log("Produto não encontrado")
        return
    }
    const resultado = await funcoes.editar("atividades.json", id, {descricao, dia, periodo, produtoId})
    if (resultado) {
        console.log("Atividade atualizada")
    }
}

async function excluirAtividade() {
    const id = Number(prompt("ID da atividade: "))
    const resultado = await funcoes.remover("atividades.json", id)
    if (resultado) {
        console.log("Atividade excluída")
    } else {
        console.log("Atividade não encontrada")
    }
}

async function consultarRotina() {
    const dia = prompt("Digite o dia da semana: ")
    const atividades = await funcoes.listar("atividades.json")
    const rotina = atividades.filter(a => a.dia.toLowerCase() === dia.toLowerCase())
    if (rotina.length === 0) {
        console.log("Nenhuma atividade para esse dia")
    }
    rotina.forEach(ati => {
        console.log("Descrição:", ati.descricao)
        console.log("Período:", ati.periodo)
        console.log("Produto ID:", ati.produtoId)
        console.log("Realizada:", ati.realizada)
    })
}

async function marcarRealizada() {
    const id = Number(prompt("ID da atividade: "))
    const atividade = await funcoes.buscar("atividades.json", id)
    if (!atividade) {
        console.log("Atividade não encontrada")
        return
    }
    const resultado = await funcoes.editar("atividades.json", id, {
        realizada: true
    })
    if (resultado) {
        console.log("Atividade marcada como realizada")
    }
}

async function menu() {
    let opcao = ""
    while (opcao !== "0") {
        console.log("Selecione uma opção")
        console.log("1) Cadastrar produto")
        console.log("2) Listar produtos")
        console.log("3) Cadastrar atividade")
        console.log("4) Listar atividades")
        console.log("5) Buscar atividade")
        console.log("6) Editar atividade")
        console.log("7) Excluir atividade")
        console.log("8) Consultar rotina do dia")
        console.log("9) Marcar atividade como realizada")
        console.log("0) Sair")

        opcao = prompt("Escolha uma opção: ")

        if (opcao === "1") {
            await cadastrarProduto()
        } else if (opcao === "2") {
            await listarProdutos()
        } else if (opcao === "3") {
            await cadastrarAtividade()
        } else if (opcao === "4") {
            await listarAtividades()
        } else if (opcao === "5") {
            await buscarAtividade()
        } else if (opcao === "6") {
            await editarAtividade()
        } else if (opcao === "7") {
            await excluirAtividade()
        } else if (opcao === "8") {
            await consultarRotina()
        } else if (opcao === "9") {
            await marcarRealizada()
        } else if (opcao === "0") {
            console.log("finalizado")
        } else {
            console.log("Opção indisponível")
        }
    }
}

menu()