export const extensoesPermitidas =(fileName) =>{
    const exPermitidas = /(.xlsx|.xls)$/i;

    if(!exPermitidas.exec(fileName)){
        return false //Não permitido
    }else{
        return true //Permitido
    }
}