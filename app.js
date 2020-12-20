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
            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }
    

    pesquisar(despesa) {
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()
        

        if(despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        if(despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        if(despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        if(despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        if(despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        if(despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        
        return despesasFiltradas
    }

    remover(id) {
        localStorage.removeItem(id)
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

function carregarListaDespesas(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros()
        
    }
    

    // selecionando tbody
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    despesas.forEach(function(d) {

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
        // criar o botão de exclusão
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function() {
            
            let id = this.id.replace('id_despesa_', '')

            bd.remover(id)

            carregarListaDespesas()
        }
        linha.insertCell(4).append(btn)
    })
    
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    carregarListaDespesas(despesas, true)
}