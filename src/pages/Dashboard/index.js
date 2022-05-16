import { useEffect, useState, useContext, useCallback } from 'react'
import { AuthContext } from '../../contexts/auth'
import { DebitosContext } from '../../contexts/debitos';
import { InvestimentosContext } from '../../contexts/investimento';

import Header from '../../components/Header'
import Title from '../../components/Title'

import { FiHome } from 'react-icons/fi'

import './style.css';

import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import Card from '../../components/Card';

function Dashboard() {
  const { user } = useContext(AuthContext);

  const { debitos, getDebitos } = useContext(DebitosContext);
  const { investimento, getInvestimentos } = useContext(InvestimentosContext);

  const [dataCategoriasAgrupadas, setDataCategoriasAgrupadas] = useState([]);
  const [dataContasPagoTotal, setContasPagoTotal] = useState([]);
  const [dataInvestimento, setDataInvestimento] = useState([]);
  const [dataMaiorInvestimento, setDataMaiorInvestimento] = useState([]);
  const [dataMaiorDebito, setDataMaiorDebito] = useState([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000", "#800000", "#808000",
    "#00FF00", "#008000", "#00FFFF", "#008080", "#0000FF", "#000080", "#FF00FF", "#800080"]

  useEffect(() => {
    getDebitos(user.uid);
    getInvestimentos(user.uid);
  }, [])

  useEffect(() => {
    CalculosDebito();
  }, [debitos])

  useEffect(() => {
    CalculaInvestimento();
  }, [investimento])

  function CalculaInvestimento() {
    let investimentosLocal = [];
    let valorTotalInvestimentos = 0;

    investimento.forEach((investimento) => {
      valorTotalInvestimentos += parseFloat(investimento.valorinvestido);
      CalculoCategoriasInvestimento(investimentosLocal, investimento);
    });

    investimentosLocal.forEach(invLocal => {
      invLocal.porcentagem = parseFloat(((parseFloat(invLocal.valor) / valorTotalInvestimentos) * 100).toFixed(2));
    });


    setDataMaiorInvestimento(ObtemMaiorValor(investimentosLocal));
    setDataInvestimento(investimentosLocal);
  }

  function CalculosDebito() {
    let pagamentos = {
      pagar: 0,
      pago: 0
    }
    const categoriasAgrupadas = [];
    const contasPagoTotal = [];
    let valorTotalDebitos = 0;
    debitos.forEach(debito => {
      valorTotalDebitos += parseFloat(debito.valor)
      CalculoPagamentos(pagamentos, debito);
      CalculoCategorias(categoriasAgrupadas, debito);
    });

    categoriasAgrupadas.forEach(categoria => {
      categoria.porcentagem = parseFloat(((parseFloat(categoria.valor) / valorTotalDebitos) * 100).toFixed(2));
    });

    contasPagoTotal.push({ nome: "Pagar", valor: parseFloat(pagamentos.pagar.toFixed(2)) });
    contasPagoTotal.push({ nome: "Pago", valor: parseFloat(pagamentos.pago.toFixed(2)) });


    setDataMaiorDebito(ObtemMaiorValor(categoriasAgrupadas));
    setDataCategoriasAgrupadas(categoriasAgrupadas);
    setContasPagoTotal(contasPagoTotal);
  }

  function CalculoPagamentos(pagamentos, debito) {
    debugger;
    if (debito.situacao == "Pendente" || debito.situacao == "Atrasado" ||debito.situacao == undefined) {
      pagamentos.pagar = parseFloat(debito.valor) + parseFloat(pagamentos.pagar)
    }

    if (debito.situacao === "Pago") {
      pagamentos.pago = parseFloat(debito.valor) + parseFloat(pagamentos.pago);
    }
  }

  function CalculoCategoriasInvestimento(investimentosLocal, investimentoCTX) {
    let indexInvestimento = investimentosLocal.findIndex(investimento => investimento.ativo === investimentoCTX.invest);
    if (indexInvestimento != -1) {
      let valorArray = parseFloat(investimentosLocal[indexInvestimento].valor);
      let valorInvestimento = parseFloat(investimentoCTX.valorinvestido);
      // .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      investimentosLocal[indexInvestimento].valor = (valorArray + valorInvestimento).toFixed(2);
    }
    else {
      investimentosLocal.push({ ativo: investimentoCTX.invest, porcentagem: 0, valor: investimentoCTX.valorinvestido });
    }
  }

  function CalculoCategorias(categoriasAgrupadas, debito) {
    let indexCategoria = categoriasAgrupadas.findIndex(categoria => categoria.nome === debito.categoria);
    if (indexCategoria != -1) {
      let valorArray = parseFloat(categoriasAgrupadas[indexCategoria].valor);
      let valorDebito = parseFloat(debito.valor);
      categoriasAgrupadas[indexCategoria].valor = (valorArray + valorDebito).toFixed(2);
    }
    else {
      categoriasAgrupadas.push({ nome: debito.categoria, valor: parseFloat(debito.valor).toFixed(2), porcentagem: 0 })
    }
  }
  
  
  function ObtemMaiorValor(array) {
    const valores = array.map(object => {
      return object.valor;
    });

    const max = Math.max(...valores);
    return max;
  }

  return (
    <div className="App">
      <Header />
      <div className="content">
        <Title nome="Dashboards">
          <FiHome size={25} />
        </Title>
        <div className="container-dash">
        <div className="row">

<Card 
  classCol={''} 
  categoria={'Em Atendimento'} 
  essencial={''} 
  classBorderLeft={'primary'} 
  calssRow={''}
  classComment={'fa-calendar'}
/>

<Card 
  classCol={'col-md-6 mb-4'} 
  categoria={'Atendimento realizado'} 
  essencial={'pagar'} 
  classBorderLeft={'success'} 
  calssRow={'no-gutters'}
  classComment={'fa-dollar-sign'}
/>

<Card 
  classCol={'col-md-6 mb-4'} 
  categoria={'Em aberto'} 
  essencial={'pago'} 
  classBorderLeft={'info'} 
  calssRow={'no-gutters'}
  classComment={'fa-clipboard-list'}
/>

<Card 
  classCol={'col-md-6 mb-4'} 
  categoria={'Em Capitação'} 
  essencial={'essencial'} 
  classBorderLeft={'warning'} 
  calssRow={'no-gutters'}
  classComment={'fa-comments'}
/>

</div>
        </div>
      </div>
    </div>
  );

}
export default Dashboard;
