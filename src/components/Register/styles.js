import styled from "styled-components";


export const Container = styled.div`
    height: auto;
    width: 100%;
    padding: 2rem;
    
    h1{
        margin: 1rem 0;
    }

    hr{
        margin: 2rem 0;
        /* border: #2962ff solid 1px */
    }

    .formulario{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
        grid-gap: 5px;
    }
`

export const TextFieldLabel = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 20rem;
    width: 19rem;
    padding: 1rem 0;

    label{
        padding-left: 2rem;
    }
    
    input, select{
        border-style: none;
        height: 4rem;
        width: 19rem;
        font-size: 1.2rem;
        font-weight: 100;
        border-radius: 40px;
        margin: 0;
        box-shadow: rgb(0 0 0 / 30%) 0px 5px 10px;
        text-align: start;
        padding: 0 2rem;
        
    }

    textarea{
        width: auto;
    }


`

export const Button = styled.button`
    height: 4rem;
    width: 19rem;
    border-style: none;
    box-shadow: rgb(0 0 0 / 30%) 0px 5px 10px;
    border-radius: 40px;
    font-size: 1.5rem;

    :hover{
        background-color: white;
    }
`

export const Search = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    align-items: center;
    height: 7rem;
    width: 100%;
    border-radius: 10px;

    input{
        height: 4rem;
        width: 50%;
        border-style: none;
        margin: 0 1rem;
        font-size: 1.5rem;
        box-shadow: rgb(0 0 0 / 30%) 0px 5px 10px;
    }

    button{
        height: 4rem;
        width: 23%;
        border-style: none;
        box-shadow: rgb(0 0 0 / 30%) 0px 5px 10px;
        border-radius: 40px;
        font-size: 1.5rem;

        :hover{
            background-color: white;
        }
    }
`



export const TextFieldLabelArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    /* border: 1px solid; */
    padding: 1rem 0;
    
    label{
        padding: 1rem;
    }


    textarea{
        width: 600px;
        height: 300px;
        box-shadow: rgb(0 0 0 / 30%) 0px 5px 10px;
        border-width: 0;
        resize: none;
        font-size: 18px;
        padding: 1rem;
        width: auto;
    }
`