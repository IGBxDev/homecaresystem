import { useState, createContext } from 'react'
import firebase from '../services/firebaseConnection'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from "uuid";


export const ProfessionalContext = createContext({})

function ProfessionalProvider({ children }) {

    const [professional, setProfessional] = useState([])
    const [lastDocs, setLastDocs] = useState();
    const [isEmpty, setIsEmpty] = useState(false);

    async function saveProfessional(data) {

        let id = uuidv4();

        await firebase.firestore().collection('professional')
            .doc(id).set({
                key: id,
                firstName: data.firstName,
                lastName: data.lastName,
                especialy: data.especialy,
                address: data.address,
                city: data.city,
                uf: data.uf,
                email: data.email,
                phone: data.phone,
                cpf: data.cpf,
                bordNumber: data.bordNumber,
                bank: data.bank,
                agency: data.agency,
                regioServes: data.regioServes,
                professionalBlocked: data.professionalBlocked,
                cep: data.cep,
                number: data.number,
                complement: data.complement,
                neighborhood: data.neighborhood
            })
            .then(() => {
                toast.success('Profissional cadastrado')
            })
            .catch(err => {
                console.log(err)
                toast.error('Algo deu errado')
            })

        getProfessional(data.professionalID);
    }

    async function updateDebitsValues(data) {

        await firebase.firestore().collection('professional')
            .doc(data.key)
            .update({
                usuario: data.usuario,
                categoria: data.categoria,
                descricao: data.descricao,
                valor: data.valor,
                situacao: data.situacao, 
                dataVencimento: data.dataVencimento
            })
            .then(() => {
                toast.success('Alterado com sucesso')
            })
            .catch((err) => {
                toast.success('Erro')
            })

        getProfessional(data.professionalID);

    }

    async function excluirDebits(idDebit, professionalID, mensagem = true) {

        await firebase.firestore().collection('professional')
            .doc(idDebit)
            .delete()
            .then(() => {
                if(mensagem){
                   toast.success("Dado exclído")
                }               
            })
            .catch(() => {
                console.log('erro ao atualizar')
            })
        getProfessional(professionalID);
    }

    async function getProfessional(professionalID) {
        setProfessional([])
        await firebase.firestore().collection('professional').where("key", "==" ,professionalID)
            .get()
            .then((snapshot) => {
                updateState(snapshot);

            })
            .catch((error) => {
                console.log(error)
            })

    }

    async function updateState(snapshot) {
        const isCollectionEmpty = snapshot.size === 0;

        if (!isCollectionEmpty) {
            let lista = [];

            snapshot.forEach((doc) => {
                lista.push({
                    key: doc.data().key,
                    usuario: doc.data().usuario,
                    categoria: doc.data().categoria,
                    descricao: doc.data().descricao,
                    valor: doc.data().valor,
                    situacao: doc.data().situacao, 
                    dataVencimento: doc.data().dataVencimento
                })
            })

            const lastDoc = snapshot.docs[snapshot.docs.length - 1]; //Pegando o ultimo documento buscado

            setProfessional(lista.sort(function (a,b) {
                if(a.categoria < b.categoria){
                    return -1;
                }
                else {
                    return true;
                }
            }));

            // setDebitos(debito => [...debito, ...lista]);
            setLastDocs(lastDoc);
        } else {
            setIsEmpty(true);
        }
    }


    return (
        <ProfessionalContext.Provider value={{
            saveProfessional,
            // getProfessional,
            // debitos,
            // setDebitos,
            // updateDebitsValues,
            // excluirDebits
        }}>
            {children}
        </ProfessionalContext.Provider>
    )
}

export default ProfessionalProvider;