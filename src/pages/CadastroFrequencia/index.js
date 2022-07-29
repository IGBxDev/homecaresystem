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
import { MenuItem, TextField } from '@mui/material';
import { InputTextarea } from 'primereact/inputtextarea';


//css
import './style.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import useForm from '../../hooks/useForm';

function CadastroFrequencia() {

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
      onClick={(e) => saveProduct(e)}
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

const saveProduct = (e) => {
  setSubmitted(true);       
  // handleSaveMomento(e)
  setNewProductsDialog(!newProductsDialog)
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
        <h5 className="mx-0 my-1">Pesquisar frequência</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
        </span>
    </div>
  );

  const popUpCadastroProfissional = (
    <Dialog visible={newProductsDialog}  header="Novo registro" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog} >
      
      <label htmlFor="name">Dados do convênio</label>
      <div className="field">        
        <TextField className='info-profissional' name='descricao' value={dataForm.descricao} onChange={(e)=> handleInputChange(e)} label="Descrição" margin="normal"variant="outlined" />
        <TextField className='info-profissional' name='numero' value={dataForm.numero} onChange={(e)=> handleInputChange(e)} label="Número" margin="normal"variant="outlined" />
      </div>
    </Dialog>
  )
  return (
    <div className="App">
      <Header />
      <div className={`content${isHumburguerActive? '-active' : '' }`}>
        <Title nome="Frequência cadastradas">
          <HowToRegSharpIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
        </Title>
        <div className="container-dash">
          
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

          <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
              dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
              globalFilter={globalFilter} header={header} responsiveLayout="scroll">
              <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
              <Column field="descricao" header="Descrição" sortable style={{ minWidth: '50%' }}></Column>
              <Column field="numero" header="Número" sortable style={{ minWidth: '50%' }}></Column>
          </DataTable>


          {newProductsDialog && popUpCadastroProfissional}
        </div>
      </div>
    </div>
  );
}

export default CadastroFrequencia