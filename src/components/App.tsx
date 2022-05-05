import { useState, useEffect } from 'react';
import Footer from './Footer'
import Header from './Header';
import Table from './Table';
import Select from './Select';
const axios = require('axios').default;

export type Escola = {
  dre: string,
  diretoria: string
}

function App() {
  const [escolas, setEscolas] = useState<Escola[]>([])

  useEffect(() => {
    axios.get('https://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/diretorias/')
      .then((response: { data: { results: Escola[] } }) => {
        setEscolas(response.data.results)
        return response;
      })
      .catch((error: any) => {
        return error
      })
  }, [])

  return (
    <>
      <Header />
      <Table />
      <Select escolas={escolas} />
      <Footer />
    </>
  );
}

export default App