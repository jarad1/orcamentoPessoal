
var iten = ''
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
        
    }
    itens() {
        function juntar(x, y) {
            if(y == undefined || y == '' || y == null) {
                iten += `${x}, `
            }
                
            }
        for (let i in this) {
            
            juntar(i, this[i])
        }
        return iten
        
    }

    validarDados() {
        for (let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null ) {
                return false 
            }
        }
        return true
    }

    
}




class Bd {
    constructor() {
        let id = localStorage.getItem('id')

        if(id === null ) {
            localStorage.setItem('id', 0)
        }
    }
    getProximoId() {
        let proximoId = localStorage.getItem('id')
        proximoId = parseInt(proximoId) + 1
        return proximoId
    }
    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }
    recuperarTodosRegistros() {

        // array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        // recuperar todas as despesas cadastradas em localStorage
        for (let i = 1; i<= id; i++ ) {

            // recuperar a despesa
            let despesa = localStorage.getItem(i)
            despesa = JSON.parse(despesa)

            // se tiver indices removidos, pula para o proximo
            if(despesa === null) {
                continue
            }

            despesas.push(despesa)
        }

        return despesas
    }

}

let bd = new Bd()


function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if(despesa.validarDados()) {
        bd.gravar(despesa)
        //dialog de sucesso
        
        let title = document.getElementById('title')
        title.innerHTML = `Registro inserido com sucesso`

        let boxTitle = document.getElementById('boxTitle')
        boxTitle.className += ' text-success'

        let boxBody = document.getElementById('boxBody')
        boxBody.innerHTML = 'Todos os campos foram preenchidos e sua despesa foi cadastrada com sucesso!'

        let boxButton = document.getElementById('boxButton')

        let buttonT = document.getElementById('buttonT')
        buttonT.className += ' btn-success'

        let consulta = document.getElementById('consulta')
        if(consulta === null) {

        let consulta = document.createElement('button')
        consulta.id = 'consulta'
        consulta.innerHTML = 'consultar despesas'
        consulta.onclick = function consultar() {
            window.location.href = 'consulta.html'
        }
        consulta.type = 'button'
        consulta.className = 'btn btn-success'

        boxButton.appendChild(consulta)
        }

        $('#modalRegistrarDespesa').modal('show')

        document.getElementById('ano').value = ''
        document.getElementById('mes').value = ''
        document.getElementById('dia').value = ''
        document.getElementById('tipo').value = ''
        document.getElementById('descricao').value = ''
        document.getElementById('valor').value = ''

    }else {

        let title = document.getElementById('title')
        
        title.innerHTML = `Erro na inclusão do registro `
        
        let boxTitle = document.getElementById('boxTitle')
        boxTitle.className += ' text-danger'
        let boxBody = document.getElementById('boxBody')
        boxBody.innerHTML = `Erro na gravação, Os campos obrigatórios ${despesa.itens()}não foram preenchidos corretamente`
        iten = ''

        let buttonT = document.getElementById('buttonT')
        buttonT.className += ' btn-danger'
        buttonT.innerHTML = 'voltar e corrigir'
        // dialog de erro
        $('#modalRegistrarDespesa').modal('show')
    }
}

function carregarListaDespesas() {
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()

    // selecionando tbody
    let listaDespesas = document.getElementById('listaDespesas')

    despesas.forEach(function(d) {

        console.log(d)
        let linha = listaDespesas.insertRow()

        linha.insertCell(0).innerHTML = (`${d.dia}/${d.mes}/${d.ano}`) 

        switch(parseInt(d.tipo)) {

            case 1: d.tipo = 'Alimentação'
                break
            case 2: d.tipo = 'Educação'
                break
            case 3: d.tipo = 'Lazer'
                break
            case 4: d.tipo = 'Saúde'
                break
            case 5: d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}