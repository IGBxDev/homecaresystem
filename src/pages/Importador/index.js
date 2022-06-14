import { useContext, useState, useRef } from 'react'

import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header'
import Title from '../../components/Title'
import * as XLSX from 'xlsx';

import './style.css';
import { toast } from 'react-toastify';
import ImportExportIcon from '@mui/icons-material/ImportExport';

const Importador = () => {

  const ref = useRef();
  const { user } = useContext(AuthContext);
  const [fileName, setFileName] = useState('')
  const [sheetPaciente, setSheetPaciente] = useState({})
  const [sheetProfissional, setSheetProfissional] = useState({})
  const [sheetConvenio, setSheetConvenio] = useState({})
  const [sheetFrequencia, setSheetFrequencia] = useState({})
  
  async function handleFile(e) {
    const file = e.target.files[0];

    setFileName(file.name);
    console.log("FILE: ", file)

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    const worksheetPaciente = workbook.Sheets[workbook.SheetNames[0]];
    const worksheetProfissional = workbook.Sheets[workbook.SheetNames[1]];
    const worksheetConvenio = workbook.Sheets[workbook.SheetNames[2]];
    const worksheetFrequencia = workbook.Sheets[workbook.SheetNames[3]];
    
    console.log("workbook: ", workbook.SheetNames)

    const dataPaciente = XLSX.utils.sheet_to_json(worksheetPaciente);
    const dataProfissional = XLSX.utils.sheet_to_json(worksheetProfissional);
    const dataConvenio = XLSX.utils.sheet_to_json(worksheetConvenio);
    const dataFrequencia = XLSX.utils.sheet_to_json(worksheetFrequencia);

    // console.log("dataPaciente", dataPaciente)
    // console.log("dataProfissional", dataProfissional)
    // console.log("dataConvenio", dataConvenio)
    // console.log("dataFrequencia", dataFrequencia)

    setSheetPaciente(dataPaciente);
    setSheetProfissional(dataProfissional);
    setSheetConvenio(dataConvenio);
    setSheetFrequencia(dataFrequencia);

    let modeloXLSX = document.getElementById("modeloXLSX") 
    modeloXLSX.innerText = file?.name

  };

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
            
            <button>Importar</button>
          </div>
            
        </div>
      </div>
    </div >
  );
}

export default Importador;
