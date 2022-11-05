import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import useForm from "../hooks/useForm";
import { toast } from "react-toastify";

export const CrudContext = createContext({})

const CrudProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [professional, setProfessional] = useState([])


     const baseUrl = "https://homecaresystem-backend.herokuapp.com"

    const getAllProfessional = async () => {
        setIsLoading(true)
        await axios.get(baseUrl + '/professional/findAll')
        .then((response)=>{

            let professional = []
            if(response.data.length > 0){
                response.data.forEach((professionalItens, index) => {                    
                    professional.push({
                        id: professionalItens._id,
                        //Dados pessoais
                            cellphone: professionalItens.cellphone,
                            cpf: professionalItens.cpf,
                            email: professionalItens.email,
                            nameComplete: professionalItens.nameComplete,
                            numeroConselho: professionalItens.numeroConselho,
                            especialidade: professionalItens.especialidade,
                            bloqueiProfissional: professionalItens.bloqueiProfissional,
                        //Regiao
                            zonaNorte: professionalItens.regiao.zonaNorte === true? "Sim" : "Não",
                            zonaLeste: professionalItens.regiao.zonaLeste  === true? "Sim" : "Não",
                            zonaSul: professionalItens.regiao.zonaSul  === true? "Sim" : "Não",
                            zonaOeste: professionalItens.regiao.zonaOeste  === true? "Sim" : "Não",
                        //Endereço
                            bairro: professionalItens.endereco[0].bairro,
                            cep: professionalItens.endereco[0].cep,
                            cidade: professionalItens.endereco[0].cidade,
                            complemento: professionalItens.endereco[0].complemento,
                            estado: professionalItens.endereco[0].estado,
                            numero: professionalItens.endereco[0].numero,
                            endereco: professionalItens.endereco[0].endereco,
                            uf: professionalItens.uf,
                        //Dados bancarios
                            agencia: professionalItens.contaBancaria[0].agencia,
                            banco: professionalItens.contaBancaria[0].banco,
                            codigoBanco: professionalItens.contaBancaria[0].codigoBanco,
                            numeroConta: professionalItens.contaBancaria[0].numeroConta,
                            tipo: professionalItens.contaBancaria[0].tipo
                    })
                })
                setProfessional(professional) 
            }        
        
        })
        .catch((error)=>{console.error(error)})
        .finally(()=>{
            setIsLoading(false)
        })
    }

    const saveProfessional = async (payload) =>{
        setIsLoading(true)
        let payloadData ={
            nameComplete: payload.nameComplete,
            cellphone: payload.cellphone,
            contaBancaria:[{
                tipo: payload.tipoConta,    
                numeroConta: payload.numeroConta,
                agencia: payload.agencia,
                banco: payload.banco,
                codigoBanco: payload.codigoBanco }],
            cpf: payload.cpf,
            email: payload.email,
            endereco: [{
                cep: payload.cep,
                bairro: payload.bairro,
                numero: payload.numero,
                cidade: payload.cidade,
                estado: payload.estado,
                complemento: payload.complemento,
                endereco: payload.endereco,
                uf: payload.uf,
             }],
            numeroConselho:payload.numeroConselho,
            regiao:  { 
                zonaNorte: payload.zonaNorte, 
                zonaLeste: payload.zonaLeste,
                zonaSul: payload.zonaSul,
                zonaOeste: payload.zonaOeste
            },               
            especialidade: payload.especialidade,
            BloqueiProfissional: payload.BloqueiProfissional
        }
        axios.post(`${baseUrl}/professional/create`, payloadData)
        .then(response => {
            console.info("info: ", response.data)
            getAllProfessional()
            toast.success("Registrado cadastrado com sucesso.")
        })
        .catch(error => {
            console.info(error)
            toast.success(error.response.data.message)
        })
        .finally(()=>  setIsLoading(false))
    }
    
    const deleteProfessional = async (payloadIds) => {
        setIsLoading(true)
        axios.delete(`${baseUrl}/professional/findByIdAndDelete`,
            { data: { professionalDelete: JSON.parse(JSON.stringify(payloadIds)) } }
        )
        .then( response => {
            getAllProfessional()
            toast.success("Registro deletado com sucesso")
        })
        .catch(error => {
            console.info(error)
            toast.error("Ocorreu um erro, caso o problema persistir contate o adm do sistema")
        })
        .finally(()=> setIsLoading(false))
    }

    return (
        <CrudContext.Provider value={{
            getAllProfessional,
            saveProfessional,
            deleteProfessional,
            professional
        }}>
            {children}
        </CrudContext.Provider>
    )
}


export default CrudProvider;
