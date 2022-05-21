import { useState } from "react";

const useForm = ( inicialState ) => {
    //Inicializa o state
    const [form, setForm] = useState(inicialState);

    //seta o valor do input
    const handleInputChange = (event) => {
        const {value, name } = event.target;
        setForm({...form, [name]: value });
    }

    const clear =() => {
        setForm(inicialState)
    }

    return [form, handleInputChange, clear]
}

export default useForm;