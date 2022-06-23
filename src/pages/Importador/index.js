import { useContext, useState, useRef } from 'react'

import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header'
import Title from '../../components/Title'
import * as XLSX from 'xlsx';

import './style.css';
import { toast } from 'react-toastify';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import * as ImportadorValidador from './ImportadorValidador'
import { PacienteContext } from '../../contexts/paciente';

const Importador = () => {

  const ref = useRef();
  const { user } = useContext(AuthContext);
  const { savePaciente, findPaciente, updatePaciente, pacienteFind } = useContext(PacienteContext)
  const [fileName, setFileName] = useState('')
  const [sheetPaciente, setSheetPaciente] = useState([{}])
  const [sheetProfissional, setSheetProfissional] = useState({})
  const [sheetConvenio, setSheetConvenio] = useState({})
  const [sheetFrequencia, setSheetFrequencia] = useState({})
  const [excelIsOK, setExcelIsOK] = useState(false)
  
  async function handleFile(e) {
    const file = e.target.files[0];

    setFileName(file.name);
    // console.log("FILE: ", file)

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    const worksheetPaciente = workbook.Sheets[workbook.SheetNames[0]];
    const worksheetProfissional = workbook.Sheets[workbook.SheetNames[1]];
    const worksheetConvenio = workbook.Sheets[workbook.SheetNames[2]];
    const worksheetFrequencia = workbook.Sheets[workbook.SheetNames[3]];
    
    // console.log("workbook: ", workbook.SheetNames)

    const dataPaciente = XLSX.utils.sheet_to_json(worksheetPaciente);
    const dataProfissional = XLSX.utils.sheet_to_json(worksheetProfissional);
    const dataConvenio = XLSX.utils.sheet_to_json(worksheetConvenio);
    const dataFrequencia = XLSX.utils.sheet_to_json(worksheetFrequencia);

    console.log("dataPaciente", dataPaciente)
    // console.log("dataProfissional", dataProfissional)
    // console.log("dataConvenio", dataConvenio)
    // console.log("dataFrequencia", dataFrequencia)
    // const convert = JSON.parse(dataPaciente)

    setSheetPaciente(dataPaciente);
    setSheetProfissional(dataProfissional);
    setSheetConvenio(dataConvenio);
    setSheetFrequencia(dataFrequencia);

    let modeloXLSX = document.getElementById("modeloXLSX") 
    modeloXLSX.innerText = file?.name

    const isSheetValid = ImportadorValidador.validaAbas(workbook.SheetNames)
    const isSheetColumnValid = ImportadorValidador.validaConlunasPaciente(dataPaciente)

    if(isSheetValid && isSheetColumnValid){
      setExcelIsOK(true)
    }

  };

  const excelImportModelo = () => {
    if(excelIsOK){      
      sheetPaciente.map((data) =>{
        let payload = {
          paciente: data.PACIENTE,
          cpf: data.CPF,
          convenio: data.CONVENIO,
          valor: data.VALOR,
          telefone: data.TELEFONE,
          cep: data.CEP,
          endereco: data.ENDERECO,
          numero: data.NUMERO,
          complemento: data.COMPLEMENTO,
          bairro: data.BAIRRO,
          estado: data.ESTADO,
          registro: data.REGISTRO,
          status: data.STATUS
        }

        findPaciente(data.CPF)

        if(pacienteFind.size != 0 && pacienteFind.size != undefined ){
          updatePaciente(pacienteFind, payload)
        }

        if(pacienteFind.size === 0){
          savePaciente(payload)
        }       
      })

    }
  }

  return (
    <div className="App">
      <Header />
      <div className="content">
        <Title nome="Importador">
          <ImportExportIcon />
        </Title>
        <div className="container-dash">
          <div className="importador">
            <label for="inputTag">
              Selecione o arquivo modelo
              <input id='inputTag' type="file" onChange={(e) => handleFile(e)} ref={ref} />
              <span id='modeloXLSX'></span>
            </label>
            
            <button onClick={() => excelImportModelo()}>Importar</button>
          </div>
            
        </div>
      </div>
    </div >
  );
}

export default Importador;
