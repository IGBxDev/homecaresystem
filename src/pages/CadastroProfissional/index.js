import React, {useContext, useRef, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import { CrudContext } from '../../contexts/Crud'
import Header from '../../components/Header'
import Title from '../../components/Title'
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';


//css
import './style.css';
import './dataTable.css'
import './popUp.css'

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';


import Register from '../../components/Register';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Checkbox, MenuItem, TextField } from '@mui/material';
import useForm from '../../hooks/useForm';
import { useEffect } from 'react'
import { toast } from 'react-toastify'

let emptyProduct = {
  id: null,
  name: '',
  image: null,
  description: '',
  category: null,
  price: 0,
  quantity: 0,
  rating: 0,
  inventoryStatus: 'INSTOCK'
};



function CadastroProfissional() {
  
  const { getAllProfessional, saveProfessional, professional, deleteProfessional } = useContext(CrudContext)
  const { user, isHumburguerActive } = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [product, setProduct] = useState();
  const [openModal, setOpenModal]= useState(false)
  const [newProductsDialog, setNewProductsDialog] = useState(false);
  const [zonaNorte, setZonaNorte] = useState(false)
  const [zonaSul, setZonaSul] = useState(false)
  const [zonaLeste, setZonaLeste] = useState(false)
  const [zonaOeste, setZonaOeste] = useState(false)

  const dt = useRef(null);

  const [dataForm, handleInputChange, clear] = useForm({});

  useEffect(()=>{
    getAllProfessional()
  },[])
  
const productDialogFooter = (
  <React.Fragment>
    <Button
      label="Cancelar"
      icon="pi pi-times"
      className="p-button-text"
      onClick={() => hideDialog()}
    />
    <Button
      label="Salvar"
      icon="pi pi-check"
      className="p-button-text"
      onClick={(e) => handleProfissional(e)}
    />
  </React.Fragment>
);

const hideDialog = () => {
  setSubmitted(false);
  setProductDialog(false);
  setNewProductsDialog(!newProductsDialog)
  
};

const deleteProduct = () => {
  let deletar = [];

  selectedProducts.forEach(customer => {
      deletar.push(customer.id)
  })

  deleteProfessional(deletar);

  setDeleteProductsDialog(false);
  toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
}

const onInputChange = (e, name) => {
  const val = (e.target && e.target.value) || "";
  let _product = { ...product };
  _product[`${name}`] = val;

  setProduct(_product);
};

const handleProfissional = (e) => {
  if(dataForm){
    let payload = {
      cellphone: dataForm.cellphone,
      cpf: dataForm.cpf,
      email: dataForm.email,
      nameComplete: dataForm.nameComplete,
      numeroConselho: dataForm.numeroConselho,
      especialidade: dataForm.especialidade,
      BloqueiProfissional: dataForm.BloqueiProfissional,
  //Regiao
      regiao: {
        zonaNorte: zonaNorte,
        zonaLeste: zonaLeste,
        zonaSul: zonaSul,
        zonaOeste: zonaOeste
      },
  //Endereço
      endereco: [{
        bairro: dataForm.bairro,
        cep: dataForm.cep,
        cidade: dataForm.cidade,
        complemento: dataForm.complemento,
        estado: dataForm.estado,
        numero: dataForm.numero,
        endereco: dataForm.endereco,
        uf: dataForm.uf
      }],      
  //Dados bancarios
    contaBancaria: [{
      agencia: dataForm.agencia,
      banco: dataForm.banco,
      codigoBanco: dataForm.codigoBanco,
      numeroConta: dataForm.numeroConta,
      tipo: dataForm.tipo}]      
    }

    saveProfessional(payload)
    setSubmitted(true);       
    setNewProductsDialog(!newProductsDialog)
  }
  
}

// ---------------------------------------------------------------------------------------


  // -----------------------------------------------------
  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
    setOpenModal(!openModal)
    setNewProductsDialog(true)
  }

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  }


  const leftToolbarTemplate = () => {
    return (
        <React.Fragment>
            <Button label="Novo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
            <Button label="Deletar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
        </React.Fragment>
    )
  }
  
  
  const header = (
    <div className="table-header">
        <h5 className="mx-0 my-1">Pesquisar profissional</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..."/>
        </span>
    </div>
  );

  const popUpCadastroProfissional = (
    <Dialog visible={newProductsDialog} style={{ width: "1000px" }} header="Novo profissional" modal className="card p-fluid" footer={productDialogFooter} onHide={hideDialog} >
      
      <label htmlFor="name">Dados Pessoais</label>
      <div className="field">        
        <TextField className='info-profissional' label="Nome completo" margin="normal"variant="outlined" name='nameComplete' value={dataForm.nameComplete} onChange={(e)=> handleInputChange(e)}/>
        <TextField className='info-profissional' label="E-mail" margin="normal" variant="outlined" name='email' value={dataForm.email} onChange={(e)=> handleInputChange(e)}/>
        <TextField className='info-profissional' label="Telefone com DDD" margin="normal" variant="outlined" name='cellphone' value={dataForm.cellphone} onChange={(e)=> handleInputChange(e)}/>
        <TextField className='info-profissional' label="CPF" margin="normal" variant="outlined" name='cpf' value={dataForm.cpf} onChange={(e)=> handleInputChange(e)}/>
        <TextField className='info-profissional' label="Número do Conselho" margin="normal" variant="outlined" name='numeroConselho' value={dataForm.numeroConselho} onChange={(e)=> handleInputChange(e)}/>
        {/* <TextField className='info-profissional' label="Região que atende" margin="normal" variant="outlined" name='regiaoAtende' value={dataForm.regiaoAtende} onChange={(e)=> handleInputChange(e)}/> */}
        <Checkbox inputId="cb1" value={zonaNorte} name="zonaNorte"checked={zonaNorte} onChange={()=> setZonaNorte(!zonaNorte)} ></Checkbox>
        <label htmlFor="cb1" className="p-checkbox-label">Zona Norte</label>
        <Checkbox inputId="cb1" value={zonaLeste}  name="zonaLeste" checked={zonaLeste} onChange={()=> setZonaLeste(!zonaLeste)} ></Checkbox>
        <label htmlFor="cb1" className="p-checkbox-label">Zona Leste</label>
        <Checkbox inputId="cb1" value={zonaSul}  name="zonaSul" checked={zonaSul} onChange={()=> setZonaSul(!zonaSul)} ></Checkbox>
        <label htmlFor="cb1" className="p-checkbox-label">Zona Sul</label>
        <Checkbox inputId="cb1" value={zonaOeste}  name="zonaOeste" checked={zonaOeste} onChange={()=> setZonaOeste(!zonaOeste)} ></Checkbox>
        <label htmlFor="cb1" className="p-checkbox-label">Zona Oeste</label>
      </div>

      <label htmlFor="name">Endereço</label>
      <div className="field">        
        <TextField className='info-profissional' label="CEP" margin="normal"variant="outlined" name='cep' value={dataForm.cep} onChange={(e)=> handleInputChange(e)}/>
        <TextField className='info-profissional' label="Endereço" margin="normal" variant="outlined" name='endereco' value={dataForm.endereco} onChange={(e)=> handleInputChange(e)}/>
        <TextField className='info-profissional' label="Número" margin="normal" variant="outlined" name='numero' value={dataForm.numero} onChange={(e)=> handleInputChange(e)}/>
        <TextField className='info-profissional' label="Complemento" margin="normal" variant="outlined" name='complemento' value={dataForm.complemento} onChange={(e)=> handleInputChange(e)}/>
        <TextField className='info-profissional' label="UF" margin="normal" variant="outlined" name='uf' value={dataForm.uf} onChange={(e)=> handleInputChange(e)}/>
        <TextField className='info-profissional' label="Cidade" margin="normal" variant="outlined" name='cidade' value={dataForm.cidade} onChange={(e)=> handleInputChange(e)}/>
        <TextField className='info-profissional' label="Bairro" margin="normal" variant="outlined" name='bairro' value={dataForm.bairro} onChange={(e)=> handleInputChange(e)}/>
      </div>     
    
      <label htmlFor="name">Dados Bancários</label>
      <div className="field">        
        <TextField className='info-profissional' label="Código do Banco" margin="normal"variant="outlined" name='codigoBanco' value={dataForm.codigoBanco} onChange={(e)=> handleInputChange(e)}/>
        <TextField className='info-profissional' label="Banco" margin="normal"variant="outlined" name='banco' value={dataForm.banco} onChange={(e)=> handleInputChange(e)}/>
        <TextField className='info-profissional' label="Agência" margin="normal" variant="outlined" name='agencia' value={dataForm.agencia} onChange={(e)=> handleInputChange(e)}/>
        <TextField className='info-profissional' label="Conta" margin="normal" variant="outlined" name='numeroConta' value={dataForm.numeroConta} onChange={(e)=> handleInputChange(e)}/>
        <TextField className='info-profissional' label="Tipo de conta cc/poup" margin="normal" variant="outlined" name='tipo' value={dataForm.tipo} onChange={(e)=> handleInputChange(e)}/>
      </div>  

      <label htmlFor="name">Demais informações</label>
      <div className="field">        
        <TextField className='info-profissional' label="Especialidades" margin="normal"variant="outlined" name='especialidade' value={dataForm.especialidade} onChange={(e)=> handleInputChange(e)}/>
        <TextField className='info-profissional' label="Profissional bloqueado?" margin="normal" variant="outlined" name='BloqueiProfissional' value={dataForm.BloqueiProfissional} onChange={(e)=> handleInputChange(e)}/>        
      </div>  
    </Dialog>
  )

  const deleteProductDialogFooter = (
    <React.Fragment>
        <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={() => hideDeleteProductDialog()} />
        <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={() => deleteProduct()} />
    </React.Fragment>
  );

  const hideDeleteProductDialog = () => {
    setDeleteProductsDialog(false);
  }
 
  return (
    <div className="App">
      <Header />
      <div className={`content${isHumburguerActive? '-active' : '' }`}>
        <Title nome="Cadastro de profissionais">
          <HowToRegSharpIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
        </Title>
        <div className="container-dash">
          
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

          {professional && 
            <DataTable ref={dt} value={professional} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                <Column field="nameComplete" header="Nome Completo" sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="email" header="E-mail" sortable style={{ minWidth: '7rem' }}></Column>
                <Column field="cellphone" header="Telefone com DDD" sortable style={{ minWidth: '14rem' }}></Column>
                <Column field="cpf" header="CPF" sortable style={{ minWidth: '5rem' }}></Column>
                <Column field="numeroConselho" header="Número do Conselho" sortable style={{ minWidth: '14rem' }}></Column>                
                <Column field="cep" header="CEP" sortable style={{ minWidth: '5rem' }}></Column>
                <Column field="endereco" header="Endereço" sortable style={{ minWidth: '8rem' }}></Column>
                <Column field="numero" header="Número" sortable style={{ minWidth: '6rem' }}></Column>
                <Column field="complemento" header="complemento" sortable style={{ minWidth: '7rem' }}></Column>
                <Column field="uf" header="UF" sortable style={{ minWidth: '3rem' }}></Column>
                <Column field="cidade" header="Cidade" sortable style={{ minWidth: '6rem' }}></Column>
                <Column field="bairro" header="Bairro" sortable style={{ minWidth: '6rem' }}></Column>
                <Column field="codigoBanco" header="Código Banco" sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="banco" header="Banco" sortable style={{ minWidth: '8rem' }}></Column>
                <Column field="agencia" header="Agência" sortable style={{ minWidth: '8rem' }}></Column>
                <Column field="numeroConta" header="Conta" sortable style={{ minWidth: '8rem' }}></Column>
                <Column field="tipo" header="Tipo de Conta CC/POP" sortable style={{ minWidth: '14rem' }}></Column>
                <Column field="especialidade" header="Especialidade" sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="BloqueiProfissional" header="Bloqueio do Profissional" sortable style={{ minWidth: '18rem' }}></Column>
                <Column field="zonaNorte" header="Zona Norte" sortable style={{ minWidth: '10rem' }}></Column>
                <Column field="zonaLeste" header="Zona Leste" sortable style={{ minWidth: '10rem' }}></Column>
                <Column field="zonaSul" header="Zona Sul" sortable style={{ minWidth: '10rem' }}></Column>
                <Column field="zonaOeste" header="Zona Oeste" sortable style={{ minWidth: '10rem' }}></Column>
            </DataTable>
          }
          {newProductsDialog && popUpCadastroProfissional}

          <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
              <div className="confirmation-content">
                  <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                  {deleteProductsDialog && <span>Tem certeza que gostaria de deletar o profissional <b>selecionados</b>?</span>}
              </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default CadastroProfissional;
