import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import React, { useState } from "react"
import useForm from "../../hooks/useForm";
import { 
    Container, 
    TextFieldLabel, 
    Button, 
    Search 
} from './styles'


const Register = ({ formulario }) => { 

    const [name, setName] = useState('');
    const [dataForm, handleInputChange, clear] = useForm({});
    
    return (
        <Container>
            <div className="cadastro-parceiros">

                <Search>
                    <input type="text" name="" id="" placeholder="Consultar profissional"/>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox  />} label="Zona Norte" />
                        <FormControlLabel control={<Checkbox  />} label="Zona Leste" />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox  />} label="Zona Sul" />
                        <FormControlLabel control={<Checkbox  />} label="Zona Oeste" />
                    </FormGroup>
                    <button>pesquisar</button>
                </Search>
                <hr />
                <h1>Dados Pessoais</h1>

                <form  className="formulario" noValidate autoComplete="off">
                    <TextFieldLabel>
                        <label htmlFor="">Nome Completo</label>
                        <input type="text" value={dataForm.name} name={'name'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>
                    <TextFieldLabel>
                        <label htmlFor="">Email</label>
                        <input type="text" value={dataForm.email} name={'email'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>
                    <TextFieldLabel>
                        <label htmlFor="">Telefone com DD</label>
                        <input type="text" value={dataForm.telefone} name={'telefone'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>
                    <TextFieldLabel>
                        <label htmlFor="">CPF</label>
                        <input type="text" value={dataForm.cpf} name={'cpf'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>
                    <TextFieldLabel>
                        <label htmlFor="">Número do Conselho</label>
                        <input type="text" value={dataForm.numeroConselho} name={'numeroConselho'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>
                    <TextFieldLabel>
                        <label htmlFor="">Região que atende</label>
                        <input type="text" value={dataForm.regiaoAtende} name={'regiaoAtende'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>                    
                </form>

                <hr />

                <h1>Endereço</h1>

                <form className="formulario" noValidate autoComplete="off">
                    <TextFieldLabel>
                        <label htmlFor="">CEP</label>
                        <input type="text" value={dataForm.cep} name={'cep'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>
                    <TextFieldLabel>
                        <label htmlFor="">Endereço</label>
                        <input type="text" value={dataForm.endereco} name={'endereco'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>
                    <TextFieldLabel>
                        <label htmlFor="">Número</label>
                        <input type="text" value={dataForm.numero} name={'numero'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>
                    <TextFieldLabel>
                        <label htmlFor="">Complemento</label>
                        <input type="text" value={dataForm.complemento} name={'complemento'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>
                    <TextFieldLabel>
                        <label htmlFor="">UF</label>
                        <input type="text" value={dataForm.uf} name={'uf'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>
                    <TextFieldLabel>
                        <label htmlFor="">Cidade</label>
                        <input type="text" value={dataForm.cidade} name={'cidade'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>
                    <TextFieldLabel>
                        <label htmlFor="">Bairro</label>
                        <input type="text" value={dataForm.bairro} name={'bairro'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>
                </form>
                
                <hr />

                <h1>Dados bancarios</h1>

                <form className="formulario" noValidate autoComplete="off">
                    <TextFieldLabel>
                        <label htmlFor="">Banco</label>
                        <input type="text" value={dataForm.banco} name={'banco'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>
                    <TextFieldLabel>
                        <label htmlFor="">Agência</label>
                        <input type="text" value={dataForm.agencia} name={'agencia'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>
                    <TextFieldLabel>
                        <label htmlFor="">Conta</label>
                        <input type="text" value={dataForm.conta} name={'conta'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>
                    <TextFieldLabel>
                        <label htmlFor="">Tipo de Conta CC/POU</label>
                        <input type="text" value={dataForm.tipoConta} name={'tipoConta'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>                 
                </form>

                <hr />

                <h1>Demais informações</h1>
                
                <form className="formulario" noValidate autoComplete="off">
                    <TextFieldLabel>
                        <label htmlFor="">Especialidade</label>
                        <input type="text" value={dataForm.especialidade} name={'especialidade'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>
                    <TextFieldLabel>
                        <label htmlFor="">Bloqueio do Profissional</label>
                        <input type="text" value={dataForm.bloqueioProfissional} name={'bloqueioProfissional'} onChange={(event) => handleInputChange(event)}/>
                    </TextFieldLabel>                  
                </form>
                <hr />

                <Button>Salvar</Button>

            </div>
        </Container>
    )
}

export default Register