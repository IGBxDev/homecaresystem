import React, {useContext, useRef, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header'
import Title from '../../components/Title'
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { TextField } from '@mui/material';
import { InputTextarea } from 'primereact/inputtextarea';


//css
import './style.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import useForm from '../../hooks/useForm';
import { useEffect } from 'react'
import { CrudContext } from '../../contexts/Crud';

function CadastroPaciente() {

  const { getAllPatient, patient, isLoading } = useContext(CrudContext)
  const { user, isHumburguerActive } = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState();
  const [openModal, setOpenModal]= useState(false)
  const [newProductsDialog, setNewProductsDialog] = useState(false);
  const dt = useRef(null);
  const [dataForm, handleInputChange, clear] = useForm({});


  useEffect(()=>{
    getAllPatient()
  },[])
// --------------------------------------------------------------------------------------
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
      onClick={(e) => savePaciente(e)}
    />
  </React.Fragment>
);

const hideDialog = () => {
  setSubmitted(false);
  setProductDialog(false);
  setNewProductsDialog(!newProductsDialog)
  
};

const onInputChange = (e, name) => {
  const val = (e.target && e.target.value) || "";
  let _product = { ...product };
  _product[`${name}`] = val;

  setProduct(_product);
};

const savePaciente = (e) => {
  setSubmitted(true);   
  console.log("dados paciente", dataForm)    
  if(dataForm){
    let payload = {
      nameComplete: dataForm.nameComplete,
      email: dataForm.email,
      cellphone: dataForm.cellphone,
      address: [{
        bairro: dataForm.bairro,
        cep: dataForm.cep,
        cidade: dataForm.cidade,
        complemento: dataForm.complemento,
        estado: dataForm.estado,
        numero: dataForm.numero,
        endereco: dataForm.endereco,
        uf: dataForm.uf
      }],
      hd: dataForm?.hd
    }

    savePatient(payload)
    setSubmitted(true);      
    setNewProductsDialog(!newProductsDialog)

  }
  
}

// ---------------------------------------------------------------------------------------


  // -----------------------------------------------------
  const openNew = () => {
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
        <h5 className="mx-0 my-1">Pesquisar paciente</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
        </span>
    </div>
  );

  const popUpCadastroProfissional = (
    <Dialog visible={newProductsDialog} style={{ width: "800px" }} header="Novo paciente" modal className="card p-fluid" footer={productDialogFooter} onHide={hideDialog} >
      
      <label htmlFor="name">Dados Pessoais</label>
      <div className="field">        
        <TextField className='info-profissional' name='nameComplete' value={dataForm.nameComplete} onChange={(e)=> handleInputChange(e)} label="Nome completo" margin="normal"variant="outlined" />
        <TextField className='info-profissional' name='email' value={dataForm.email} onChange={(e)=> handleInputChange(e)} label="E-mail" margin="normal" variant="outlined" />
        <TextField className='info-profissional' name='cellphone' value={dataForm.cellphone} onChange={(e)=> handleInputChange(e)} label="Telefone com DDD" margin="normal" variant="outlined" />
      </div>

      <label htmlFor="name">Endereço</label>
      <div className="field">        
        <TextField className='info-profissional' name='cep' value={dataForm.cep} onChange={(e)=> handleInputChange(e)} label="CEP" margin="normal"variant="outlined" />
        <TextField className='info-profissional' name='endereco' value={dataForm.endereco} onChange={(e)=> handleInputChange(e)} label="Endereço" margin="normal" variant="outlined" />
        <TextField className='info-profissional' name='numero' value={dataForm.numero} onChange={(e)=> handleInputChange(e)} label="Número" margin="normal" variant="outlined" />
        <TextField className='info-profissional' name='complemento' value={dataForm.complemento} onChange={(e)=> handleInputChange(e)} label="Complemento" margin="normal" variant="outlined" />
        <TextField className='info-profissional' name='uf' value={dataForm.uf} onChange={(e)=> handleInputChange(e)} label="UF" margin="normal" variant="outlined" />
        <TextField className='info-profissional' name='cidade' value={dataForm.cidade} onChange={(e)=> handleInputChange(e)} label="Cidade" margin="normal" variant="outlined" />
        <TextField className='info-profissional' name='bairro' value={dataForm.bairro} onChange={(e)=> handleInputChange(e)} label="Bairro" margin="normal" variant="outlined" />
        <TextField className='info-profissional' name='estado' value={dataForm.estado} onChange={(e)=> handleInputChange(e)} label="Estado" margin="normal" variant="outlined" />
      </div>     
  
      <label htmlFor="name">HD</label>
      <div className="field">        
        <InputTextarea id="hd" name='hd' value={dataForm.hd} onChange={(e)=> handleInputChange(e)} required rows={3} cols={20} />     
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
 
  const deleteProduct = () => {
    let deletar = [];
  
    selectedProducts.forEach(customer => {
        deletar.push(customer.id)
    })
  
    deletePatient(deletar);
  
    setDeleteProductsDialog(false);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
  }


  return (
    <div className="App">
      <Header />
      <div className={`content${isHumburguerActive? '-active' : '' }`}>
        <Title nome="Cadastro de paciente">
          <HowToRegSharpIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
        </Title>
        <div className="container-dash">
                    
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

          {patient && 
            <DataTable ref={dt} value={patient} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                <Column field="nameComplete" header="Nome Completo" sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="email" header="E-mail" sortable style={{ minWidth: '7rem' }}></Column>
                <Column field="cellphone" header="Telefone com DDD" sortable style={{ minWidth: '14rem' }}></Column>
                <Column field="cep" header="CEP" sortable style={{ minWidth: '5rem' }}></Column>
                <Column field="endereco" header="Endereço" sortable style={{ minWidth: '8rem' }}></Column>
                <Column field="numero" header="Número" sortable style={{ minWidth: '6rem' }}></Column>
                <Column field="complemento" header="complemento" sortable style={{ minWidth: '7rem' }}></Column>
                <Column field="uf" header="UF" sortable style={{ minWidth: '3rem' }}></Column>
                <Column field="cidade" header="Cidade" sortable style={{ minWidth: '6rem' }}></Column>
                <Column field="bairro" header="Bairro" sortable style={{ minWidth: '6rem' }}></Column>

                <Column field="hd" header="HD" sortable style={{ minWidth: '12rem' }}></Column>
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

export default CadastroPaciente;
