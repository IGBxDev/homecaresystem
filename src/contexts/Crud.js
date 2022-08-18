import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CrudContext = createContext({})

const CrudProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [professional, setProfessional] = useState([])
    const [patient, setPatient]= useState([])


    const baseUrl = "https://homecaresystem-backend.herokuapp.com"

//-----------------Professional-------------------------------//
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
                            BloqueiProfissional: professionalItens.BloqueiProfissional,
                        //Regiao
                            zonaNorte: professionalItens.regiao?.zonaNorte === true? "Sim" : "Não",
                            zonaLeste: professionalItens.regiao?.zonaLeste  === true? "Sim" : "Não",
                            zonaSul: professionalItens.regiao?.zonaSul  === true? "Sim" : "Não",
                            zonaOeste: professionalItens.regiao?.zonaOeste  === true? "Sim" : "Não",
                        //Endereço
                            bairro: professionalItens.endereco[0].bairro,
                            cep: professionalItens.endereco[0].cep,
                            cidade: professionalItens.endereco[0].cidade,
                            complemento: professionalItens.endereco[0].complemento,
                            estado: professionalItens.endereco[0].estado,
                            numero: professionalItens.endereco[0].numero,
                            endereco: professionalItens.endereco[0].endereco,
                            uf: professionalItens.endereco[0].uf,
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

    const saveProfessional = async(payload) => {
        setIsLoading(true)
        await axios.post(baseUrl + '/professional/create', payload)
        .then((response)=>{
            getAllProfessional()
        })
        .catch((error)=>{
            console.log("saveProfessional error: ", error)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    const deleteProfessional = async (filters) =>{
        await axios.delete(baseUrl+'/professional/findByIdAndDelete',
        { data: { professionalDelete: JSON.parse(JSON.stringify(filters)) } })
            .then(function (response) {
                toast.success('Deletado com sucesso')
                getAllProfessional();
            })
            .catch(err =>{
                console.log("deleteProfessional: ", err )
                toast.error('Algo deu errado')
            })
    }

//----------------- Professional end-------------------------//
//----------------- Patient end -----------------------------//  
    const getAllPatient = async()=>{
        setIsLoading(true)
        await axios.get(baseUrl + '/patient/findAll')
        .then((response)=>{
            let list = []
            if(response.data.length > 0){
                response.data.forEach((patientItens, index) => {                    
                    list.push({
                        id: patientItens._id,
                        nameComplete: patientItens.nameComplete,
                        email: patientItens.email,
                        cellphone: patientItens.cellphone,
                        address: patientItens.address[0].endereco,
                        cep: patientItens.address[0].cep,
                        bairro: patientItens.address[0].bairro,
                        numero: patientItens.address[0].numero,
                        cidade: patientItens.address[0].cidade,
                        estado: patientItens.address[0].estado,
                        complemento: patientItens.address[0].complemento,
                        uf: patientItens.address[0].uf,
                        hd: patientItens?.hd //incluir
                    })

                    setPatient(list)
                })
            }
        })
        .catch((error)=>{
            console.log("getAllPatient error: ", error)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    const savePatient = async (payload) => {
        setIsLoading(true)
        await axios.post(baseUrl + '/patient/create', payload)
        .then((response)=>{
            setPatient([])
            getAllPatient()
        })
        .catch((error)=>{
            console.log("savePatient error: ", error)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    const deletePatient = async (filters) =>{
        setIsLoading(true)
        await axios.delete(baseUrl+'/patient/findByIdAndDelete',
        { data: { patientDelete: JSON.parse(JSON.stringify(filters)) } })
            .then(function (response) {
                toast.success('Deletado com sucesso')
                setPatient([])
                getAllPatient();
            })
            .catch(err =>{
                console.log("deletePatient: ", err )
                toast.error('Algo deu errado')
            }).finally(()=>{
                setIsLoading(false)
            })
    }

//----------------- Professional end-------------------------//
    return (
        <CrudContext.Provider value={{
            getAllProfessional,
            saveProfessional,
            deleteProfessional,
            professional,

        //Patient
            getAllPatient,
            savePatient,
            setPatient,
            deletePatient,
            patient,
        }}>
            {children}
        </CrudContext.Provider>
    )
}


export default CrudProvider;
