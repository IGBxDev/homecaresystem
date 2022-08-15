import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import useForm from "../hooks/useForm";

export const CrudContext = createContext({})

const CrudProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [patient, setPatient] = useState([])


    const baseUrl = "https://homecaresystem-backend.herokuapp.com"

    const getAllPatient = async () => {
        setIsLoading(true)
        await axios.get(baseUrl + '/paciente/findAll')
        .then((response)=>{
            console.log("response data: ",response.data)
            setPatient(response.data)
            setIsLoading(false)
        })
        .catch((error)=>{console.error(error)})
        .finally(()=>{
            setIsLoading(false)
        })
    }
    
    return (
        <CrudContext.Provider value={{
            getAllPatient,
            patient
        }}>
            {children}
        </CrudContext.Provider>
    )
}


export default CrudProvider;
