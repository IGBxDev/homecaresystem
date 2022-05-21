import React, { useState } from "react";

import {GlobalStateContext} from './GlobalStateContext';

const GlobalState = (props) => {
    const [uf, setUFs] = useState([])
    const [bank, setBank] = useState([])
    const [dataCEP, setDataCEP] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const states = { uf, bank, dataCEP, isLoading}
    const setters = { setUFs, setBank, setDataCEP, setIsLoading }

return(
    <GlobalStateContext.Provider value={{ states, setters }}>
        {props.children}
    </GlobalStateContext.Provider>)
}

export default GlobalState;