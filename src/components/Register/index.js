import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import React, { useState } from "react"
import useForm from "../../hooks/useForm";
import { Specialty, ProfessionalBlocked, TipoConta } from '../../services/lists'
import { 
    Container, 
    TextFieldLabel, 
    Button, 
    Search,
    TextFieldLabelArea
} from './styles'


const Register = ({ formulario }) => { 

    const [name, setName] = useState('');
    const [dataForm, handleInputChange, clear] = useForm({});

    
    const comparadorChaveValorEndereco = [
        { name: 'bairro', value: '', chaveValor: 'bairro'},
        { name: 'cidade', value: '', chaveValor: 'localidade'},
        { name: 'endereco', value: '', chaveValor: 'logradouro'},
        { name: 'uf', value: '', chaveValor: 'uf'}
    ]

    //Busca o endereço na api do correio
    const searchCEP = (event) => {
        fetch(`https://viacep.com.br/ws/${event.target.value}/json/`)
        .then((res) => res.json())
        .then((data)=>{ 
            const cepPropsFind = Object.getOwnPropertyNames(data) //pega as propiedades do Objeto            
            comparadorChaveValorEndereco.forEach((c)=>{  
                cepPropsFind.forEach((propName)=>{
                    if(c.chaveValor === propName){
                        let ev = {
                            target: {
                                value: data[propName],
                                name: c.name 
                            }                             
                        }    
                        handleInputChange(ev) //atualiza o campo do formulário
                    }
                })
            })          
        })
        .catch(()=>{})
    } 

    return (
        <Container>

            {formulario === "profissional" && (
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
                            <label >Nome Completo</label>
                            <input type="text" value={dataForm.name} name={'name'} onChange={(event) => handleInputChange(event)}/>
                        </TextFieldLabel>
                        <TextFieldLabel>
                            <label >Email</label>
                            <input type="text" value={dataForm.email} name={'email'} onChange={(event) => handleInputChange(event)}/>
                        </TextFieldLabel>
                        <TextFieldLabel>
                            <label >Telefone com DD</label>
                            <input type="text" value={dataForm.telefone} name={'telefone'} onChange={(event) => handleInputChange(event)}/>
                        </TextFieldLabel>
                        <TextFieldLabel>
                            <label >CPF</label>
                            <input type="text" value={dataForm.cpf} name={'cpf'} onChange={(event) => handleInputChange(event)}/>
                        </TextFieldLabel>
                        <TextFieldLabel>
                            <label >Número do Conselho</label>
                            <input type="text" value={dataForm.numeroConselho} name={'numeroConselho'} onChange={(event) => handleInputChange(event)}/>
                        </TextFieldLabel>
                        <TextFieldLabel>
                            <label >Região que atende</label>
                            <input type="text" value={dataForm.regiaoAtende} name={'regiaoAtende'} onChange={(event) => handleInputChange(event)}/>
                        </TextFieldLabel>                    
                    </form>

                    <hr />

                    <h1>Endereço</h1>

                    <form className="formulario" noValidate autoComplete="off">
                        <TextFieldLabel>
                            <label >CEP</label>
                            <input 
                                type="text" 
                                value={dataForm.cep} 
                                name={'cep'} 
                                onChange={(event) => handleInputChange(event)} 
                                onBlur={(event) => {searchCEP(event)}}
                            />
                        </TextFieldLabel>
                        <TextFieldLabel>
                            <label >Endereço</label>
                            <input type="text" value={dataForm.endereco} name={'endereco'} onChange={(event) => handleInputChange(event)}/>
                        </TextFieldLabel>
                        <TextFieldLabel>
                            <label >Número</label>
                            <input type="text" value={dataForm.numero} name={'numero'} onChange={(event) => handleInputChange(event)}/>
                        </TextFieldLabel>
                        <TextFieldLabel>
                            <label >Complemento</label>
                            <input type="text" value={dataForm.complemento} name={'complemento'} onChange={(event) => handleInputChange(event)}/>
                        </TextFieldLabel>
                        <TextFieldLabel>
                            <label >UF</label>
                            <input type="text" value={dataForm.uf} name={'uf'} onChange={(event) => handleInputChange(event)}/>
                        </TextFieldLabel>
                        <TextFieldLabel>
                            <label >Cidade</label>
                            <input type="text" value={dataForm.cidade} name={'cidade'} onChange={(event) => handleInputChange(event)}/>
                        </TextFieldLabel>
                        <TextFieldLabel>
                            <label >Bairro</label>
                            <input type="text" value={dataForm.bairro} name={'bairro'} onChange={(event) => handleInputChange(event)}/>
                        </TextFieldLabel>
                    </form>
                    
                    <hr />

                    <h1>Dados bancarios</h1>

                    <form className="formulario" noValidate autoComplete="off">
                        <TextFieldLabel>
                            <label >Banco</label>
                            <input type="text" value={dataForm.banco} name={'banco'} onChange={(event) => handleInputChange(event)}/>
                        </TextFieldLabel>
                        <TextFieldLabel>
                            <label >Agência</label>
                            <input type="text" value={dataForm.agencia} name={'agencia'} onChange={(event) => handleInputChange(event)}/>
                        </TextFieldLabel>
                        <TextFieldLabel>
                            <label >Conta</label>
                            <input type="text" value={dataForm.conta} name={'conta'} onChange={(event) => handleInputChange(event)}/>
                        </TextFieldLabel>
                        <TextFieldLabel>
                            <label >Tipo de Conta CC/POU</label>
                            <select className="textfieldlista" name={'tipoconta'}>
                            {TipoConta.map((tipo)=>{
                                return( <option value={tipo.id}>{tipo.value}</option> )
                            })}
                            </select>
                            {/* <label >Tipo de Conta CC/POU</label> */}
                            {/* <input type="text" value={dataForm.tipoConta} name={'tipoConta'} onChange={(event) => handleInputChange(event)}/> */}
                        </TextFieldLabel>   

        
                    </form>

                    <hr />

                    <h1>Demais informações</h1>
                    
                    <form className="formulario" noValidate autoComplete="off">
                        <TextFieldLabel>
                            <label >Especialidade</label>
                            <select  name={'especialidade'}>
                                <option value=""></option>
                            {Specialty.map((tipo)=>{
                                return( <option value={tipo.id}>{tipo.value}</option> )
                            })}
                            </select>
                            {/* <label >Especialidade</label> */}
                            {/* <input type="text" value={dataForm.especialidade} name={'especialidade'} onChange={(event) => handleInputChange(event)}/> */}
                        </TextFieldLabel>
                        <TextFieldLabel>
                            <label >Bloqueio do Profissional</label>
                            <select  name={'bloqueioProfissional'} value={dataForm.bloqueioProfissional} onChange={(event) => handleInputChange(event)}>
                                <option value=""></option>
                            {ProfessionalBlocked.map((tipo)=>{
                                return( <option value={tipo.id}>{tipo.value}</option> )
                            })}
                            </select>
                            {/* <label >Bloqueio do Profissional</label> */}
                            {/* <input type="text" value={dataForm.bloqueioProfissional} name={'bloqueioProfissional'} onChange={(event) => handleInputChange(event)}/> */}
                        </TextFieldLabel>                  
                    </form>
                    <hr />

                    <Button>Salvar</Button>

                </div>
            )}

            {formulario === "paciente" &&(
                <Container>
                    <div className="cadastro-paciente">

                        <Search>
                            <input type="text" name="" id="" placeholder="Consultar paciente"/>
                            
                            <button>pesquisar</button>
                        </Search>
                        <hr />
                        <h1>Dados Pessoais</h1>

                        <form  className="formulario" noValidate autoComplete="off">
                            <TextFieldLabel>
                                <label >Nome Completo</label>
                                <input type="text" value={dataForm.name} name={'name'} onChange={(event) => handleInputChange(event)}/>
                            </TextFieldLabel>
                            <TextFieldLabel>
                                <label >Telefone com DD</label>
                                <input type="text" value={dataForm.telefone} name={'telefone'} onChange={(event) => handleInputChange(event)}/>
                            </TextFieldLabel>                   
                        </form>

                        <hr />

                        <h1>Endereço</h1>

                        <form className="formulario" noValidate autoComplete="off">
                            <TextFieldLabel>
                                <label >CEP</label>
                                <input 
                                    type="text" 
                                    value={dataForm.cep} 
                                    name={'cep'} 
                                    onChange={(event) => handleInputChange(event)} 
                                    onBlur={(event) => {searchCEP(event)}}
                                />
                            </TextFieldLabel>
                            <TextFieldLabel>
                                <label >Endereço</label>
                                <input type="text" value={dataForm.endereco} name={'endereco'} onChange={(event) => handleInputChange(event)}/>
                            </TextFieldLabel>
                            <TextFieldLabel>
                                <label >Número</label>
                                <input type="text" value={dataForm.numero} name={'numero'} onChange={(event) => handleInputChange(event)}/>
                            </TextFieldLabel>
                            <TextFieldLabel>
                                <label >Complemento</label>
                                <input type="text" value={dataForm.complemento} name={'complemento'} onChange={(event) => handleInputChange(event)}/>
                            </TextFieldLabel>
                            <TextFieldLabel>
                                <label >UF</label>
                                <input type="text" value={dataForm.uf} name={'uf'} onChange={(event) => handleInputChange(event)}/>
                            </TextFieldLabel>
                            <TextFieldLabel>
                                <label >Cidade</label>
                                <input type="text" value={dataForm.cidade} name={'cidade'} onChange={(event) => handleInputChange(event)}/>
                            </TextFieldLabel>
                            <TextFieldLabel>
                                <label >Bairro</label>
                                <input type="text" value={dataForm.bairro} name={'bairro'} onChange={(event) => handleInputChange(event)}/>
                            </TextFieldLabel>
                        </form>
                       
                        <hr />

                        <h1>Demais informações</h1>

                        <form  className="formulario" noValidate autoComplete="off" style={{ margin: 0, width: '100%' }}>
                            <TextFieldLabelArea>
                                <label >HD</label>
                                <textarea 
                                    value={dataForm.name} name={'name'} 
                                    onChange={(event) => handleInputChange(event)}

                                    cols={100}
                                />
                            </TextFieldLabelArea>                
                        </form>

                        <hr />

                        <Button>Salvar</Button>

                        </div>
                </Container>
            )}


        </Container>
    )
}

export default Register