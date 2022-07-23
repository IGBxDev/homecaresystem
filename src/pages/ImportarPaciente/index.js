import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { useRef, useState, useContext } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiTrendingUp } from 'react-icons/fi'
import { Button } from 'primereact/button'
import { extensoesPermitidas } from '../../utils';
import * as XLSX from 'xlsx';
import { useEventCallback } from '@mui/material';

const ImportarPaciente = () => {
    const { user, isHumburguerActive } = useContext(AuthContext);
    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);
    const fileUploadRef = useRef(null);
    const [fileName, setFileName]= useState(null)
    const [fileData, setFileData] = useState(null)
    const [fileJsonData, setFileJsonData]= useState(null)
    
    
    let fileOnRemove = null
    
    const onUpload = () => {
        console.log("Upload do arquivo")
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        e.files.forEach(file => {
            _totalSize += file.size;
        });

        setTotalSize(_totalSize);
    }

    const onTemplateUpload = (e) => {
        console.log("onTemplateUpload",e)
        let _totalSize = 0;
        e.files.forEach(file => {
            _totalSize += (file.size || 0);
        });

        setTotalSize(_totalSize);
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }

    const onBasicUpload = () => {
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
    }

    const onBasicUploadAuto = () => {
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
    }

    const headerTemplate = (options) => {
        
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize/10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 1 MB`} style={{width: '300px', height: '20px', marginLeft: 'auto'}}></ProgressBar>
            </div>
        );
    }

    const itemTemplate = (file, props) => {
        console.log("itemTemplate", file)
        fileOnRemove = props.onRemove
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{width: '40%'}}>
                    {/* <img alt={file.name} role="presentation" src={file.objectURL} width={100} /> */}
                    {/* <span className='pi pi-file-excel' style={{color: 'green'}} size={100}></span> */}
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        {/* <small>{new Date().toLocaleDateString()}</small> */}
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button 
                    type="button" 
                    icon="pi pi-times" 
                    className="p-button-outlined p-button-rounded p-button-danger ml-auto" 
                    onClick={() => onTemplateRemove(file, props.onRemove)} 
                />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)'}}></i>
                <span style={{'fontSize': '1.2em', color: 'var(--text-color-secondary)'}} className="my-5">Drag and Drop Image Here</span>
            </div>
        )
    }

    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded 
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then(r => r.blob()); //blob:url
        reader.readAsDataURL(blob); 
        reader.onloadend = function () {
            const base64data = reader.result;
            console.log(base64data);
        }
    }

    const chooseOptions = {label: 'Choose', icon: 'pi pi-fw pi-plus'};
    const uploadOptions = {label: 'Uplaod', icon: 'pi pi-upload', className: 'p-button-success'};
    const cancelOptions = {label: 'Cancel', icon: 'pi pi-times', className: 'p-button-danger'};

    const invoiceUploadHandler = (event) => {
        console.log(`meu arquivo: ${event.target}`)
        // const [file] = files;
        // const fileReader = new FileReader();
        // fileReader.onload = (e) => {
        //     uploadInvoice(e.target.result);
        // };
        // fileReader.readAsDataURL(file);
    };

    const uploadInvoice = async (invoiceFile) => {
        let formData = new FormData();
        formData.append('invoiceFile', invoiceFile);
    
        const response = await fetch(`orders/${'orderId'}/uploadInvoiceFile`,
            {
                method: 'POST',
                body: formData
            },
        );
    };

    const myUploader = (event) => {
        console.log(`meu arquivo: ${JSON.stringify(event.options.props.url)}`)
    }

    const uploadHandler = async (e) =>{
     
       const file = e.files[0]
       setFileName(file.name)
       setFileData(file)
       const jsonData = await convertXLSXToJson(file)
       setFileJsonData(jsonData)
       onTemplateRemove(file, fileOnRemove)
    
    }

    const convertXLSXToJson = async (file) => {
        const data = await file.arrayBuffer();
        const workBook = XLSX.read(data);
        const worksheet = workBook.Sheets[workBook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        return jsonData
    } 

    const onRemove = (e) =>{
        console.log("onRemove file", e)
    }
    return (
        <div className="App">
             <Header />
             <div className={`content${isHumburguerActive? '-active' : '' }`}>
                <Title nome="Importador de paciente">
                    <FiTrendingUp size={25} />
                </Title>


                <div className="card">
                <Button label="Selecione um arquivo" icon="pi pi-fw pi-plus" type='file' />
                <Button label="Upload" icon="pi pi-upload" className='p-button-success'/>
                <Button label="Cancelar" icon="pi pi-times" className='p-button-danger' />
 
                <FileUpload name="demo" url="./Importador.xlsx" customUpload uploadHandler={myUploader} />
                    <FileUpload 
                    itemTemplate={itemTemplate}
                    customUpload={true}
                    uploadHandler={uploadHandler}
                    chooseLabel='Selecione um arquivo'
                    uploadLabel='Enviar'
                    cancelLabel='Cancelar'
                    // uploadHandler={invoiceUploadHandler}
                    // onUpload={onUpload}
                    // onRemove={(e)=> onRemove }
                    emptyTemplate={<p className="m-0">Arraste e solte os arquivos aqui para fazer o upload.</p>} />
                </div>
            </div>
        </div>
    )
}

export default ImportarPaciente