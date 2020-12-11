
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
