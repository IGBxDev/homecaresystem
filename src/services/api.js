import axios from "axios"
import { useRequestData } from "../hooks/useRequestData"

//here the url that you find more information about
//https://viacep.com.br/
export const UsesearchAddress = (cep) => {
    const url = `https://brasilapi.com.br/api/cep/v2/${cep}`
    const {data, isLoading, error} = useRequestData(url,[])
    console.log("UsesearchAddress", data)
}

export const getCEP = (cep, setDataCEP, setIsLoading) => {
    setIsLoading(true)
    const url = `https://brasilapi.com.br/api/cep/v2/${cep}`
    axios.get(url)
    .then((response)=> { setDataCEP(response.data); console.log("cep", response.data) })
    .catch((error)=> error )
    .finally(()=> setIsLoading(false))
}

//here the url that you find more information about
//https://brasilapi.com.br/docs#tag/BANKS
export const getBank = () => {
    const url = `https://brasilapi.com.br/api/banks/v1`
    axios.get(url)
    .then((response)=> console.log("bank", response))
    .catch((error)=> console.log("error bank", error.response))
}

//here the url that you find more information about
//https://brasilapi.com.br/docs#tag/BANKS
export const searcCNPJ = (cnpj) => {
    const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`
    axios.get(url)
    .then((response)=> console.log("cnpj", response))
    .catch((error)=> console.log("error cnpj", error.response))
}


//here the url that you find more information about
//https://brasilapi.com.br/docs#tag/BANKS
export const searcCityDDD = (ddd) => {
    const url = `https://brasilapi.com.br/api/ddd/v1/${ddd}`
    axios.get(url)
    .then((response)=> console.log("ddd", response))
    .catch((error)=> console.log("error ddd", error.response))
}


//here the url that you find more information about
//https://servicodados.ibge.gov.br/api/v1/localidades/estados
export const getUFs = () => {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
    axios.get(url)
    .then((response)=> console.log("ddd", response))
    .catch((error)=> console.log("error ddd", error.response))
}