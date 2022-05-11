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
      <div className='SelectETable'>
        <Select escolas={escolas} setDre={setDre}/>
        <Table  dre={dre}/>
      </div>
      <Footer />
    </>
  );
}

export default App