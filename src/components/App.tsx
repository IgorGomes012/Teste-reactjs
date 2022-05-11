import { useState, useEffect } from 'react';
import Footer from './Footer/Footer'
import Header from './Header';
import Table from './Table/Table';
import Select from './Select/Select';
const axios = require('axios').default;

export type Escola = {
  dre: string,
  diretoria: string
}

function App() {
  const [escolas, setEscolas] = useState<Escola[]>([])
  const [dre,setDre] = useState('JT')
 
  useEffect(() => {
    axios.get('https://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/diretorias/')
      .then((response: { data: { results: Escola[] } }) => {
        setEscolas(response.data.results)
      })
      .catch((error: any) => {
        console.error(error)
      })
  }, [])

  return (
    <>
      <Header />
      <Select escolas={escolas} setDre={setDre}/>
      <Table  dre={dre}/>
      <Footer />
    </>
  );
}

export default App