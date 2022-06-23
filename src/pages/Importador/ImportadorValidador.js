export const validaAbas = (abas) => {
    let { abaPaciente, abaProfissional, abaConvenio, abaFrequencia } = false
    let isValid = false

    abas.map( aba => {
        console.log("ABAS: ", aba)
        if(aba === "Paciente"){
            abaPaciente = true
        }

        if(aba === "Profissional"){
            abaProfissional = true
        }

        if(aba === "Convenio"){
            abaConvenio = true
        }

        if(aba === "Frequencia"){
            abaFrequencia = true
        }

        if(abaPaciente && abaProfissional && abaConvenio && abaFrequencia){
            isValid = true
        }
    
    })
    return isValid
}

export const validaConlunasPaciente = (pacientes) => {
    let isValid = false
    let getPropsJSONPaciente = []
    const sheetColumns =["Paciente","CPF","Convenio","Valor","Telefone","CEP","Endereço","Número","Complemento","Bairro","Cidade","Estado","Registro","Status"]

    pacientes.map((p)=>{
        getPropsJSONPaciente = Object.getOwnPropertyNames(p)
    })

    sheetColumns.forEach( (column, index) => {

        if(column.toUpperCase() != getPropsJSONPaciente[index + 1].toUpperCase()){
            isValid = false
            return isValid
        }

        isValid = true
    })

    return isValid
}