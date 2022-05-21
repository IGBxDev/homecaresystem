import { useState, useEffect } from "react";
import axios from 'axios';

export const useRequestData = (url, initialState) => {
    const [data, setData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(()=>{
        const fetch = async () => {
            setIsLoading(true);
            try{
                const { data } = await axios.get(url);
                console.log("hook useRequestData", data)
                setData(data);
            }catch(e){
                setError(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetch();
    },[]);

    return [data, isLoading, error]
}