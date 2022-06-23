import { useState, useEffect, createContext } from 'react'
import firebase from '../services/firebaseConnection'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from "uuid";


export const PacienteContext = createContext({})

function PacienteProvider({ children }) {

    const [paciente, setPaciente] = useState([])
    const [pacienteFind, setPacienteFind]= useState([])
    const [lastDocs, setLastDocs] = useState();
    const [isEmpty, setIsEmpty] = useState(false);

    async function savePaciente(payload) {

        let id = uuidv4();


           await firebase.firestore().collection('Paciente')
            .doc(id).set({
                key: id,
                paciente: payload.paciente,
                cpf: payload.cpf,
                convenio: payload.convenio,
                valor: payload.valor,
                telefone: payload.telefone,
                cep: payload.cep,
                endereco: payload.endereco,
                numero: payload.numero,
                complemento: payload.complemento,
                bairro: payload.bairro,
                estado: payload.estado,
                registro: payload.registro,
                status: payload.status
            })
            .then(() => {
                toast.success('Paciente cadastrado')
            })
            .catch(err => {
                console.log(err)
                toast.error('Algo deu errado')
            })
              

            // getInvestimentos(data.usuario);
    }

    async function findPaciente(CPF) {
        setPacienteFind([])
        console.log(`cpf informado: ${CPF}`)
        await firebase.firestore().collection('Paciente').where("cpf", "==" ,CPF)
            .get()
            .then((snapshot) => {
                // updatePaciente(snapshot);
                setPacienteFind(snapshot)
            })
            .catch((error) => {
                console.log(error)
            })  
    }

    // async function updatePaciente(snapshot, payload) {
    //     const isCollectionEmpty = snapshot.size === 0;
    //     console.log(`snapshot ${snapshot.ref}`)

    //     if (!isCollectionEmpty) {
    //         let lista = [];

    //         snapshot.forEach((doc) => {
    //             console.log(`meu data update: ${doc.data()}`)
    //             lista.push({
    //                 key: doc.data().key,
    //                 paciente: payload.paciente,
    //                 convenio: payload.convenio,
    //                 valor: payload.valor,
    //                 telefone: payload.telefone,
    //                 cep: payload.cep,
    //                 endereco: payload.endereco,
    //                 numero: payload.numero,
    //                 complemento: payload.complemento,
    //                 bairro: payload.bairro,
    //                 estado: payload.estado,
    //                 registro: payload.registro,
    //                 status: payload.status
    //             })

    //             doc.update(lista)

    //         })
    //     } 
    // }

    // async function excluirInvestimento(idInvestimento, userId, mensagem = true) {

    //     await firebase.firestore().collection('Investimentos')
    //         .doc(idInvestimento)
    //         .delete()
    //         .then(() => {
    //             if(mensagem){
    //                 toast.success('Dados excluidos')
    //             }                
    //         })
    //         .catch(() => {
    //             toast.success('Não foi possível excluir o registro, tente novamente mais tarde')
    //         })
    //         getInvestimentos(userId);
    // }

    async function updatePaciente(snapshot, payload) {
        
        console.log(`meu id: ${snapshot.docs[0].id}`)

        await firebase.firestore().collection('Paciente')
            .doc(snapshot.docs[0].id)
            .update({
                key: snapshot.docs[0].id,
                paciente: payload.paciente,
                convenio: payload.convenio,
                valor: payload.valor,
                telefone: payload.telefone,
                cep: payload.cep,
                endereco: payload.endereco,
                numero: payload.numero,
                complemento: payload.complemento,
                bairro: payload.bairro,
                estado: payload.estado,
                registro: payload.registro,
                status: payload.status
            })
            .then(() => {
                toast.success('Alterado com sucesso')
            })
            .catch((err) => {
                toast.error('Erro')
            })

        // getInvestimentos(data.usuario);

    }

    return (
        <PacienteContext.Provider value={{
            savePaciente,
            findPaciente,
            updatePaciente,
            paciente,
            pacienteFind,
            // setPaciente,
            // excluirInvestimento,
            // updateInvestimentoValues
        }}>
            {children}
        </PacienteContext.Provider>
    )
}

export default PacienteProvider;