import { useState, useEffect } from 'react'
import './Table.css'
const axios = require('axios').default;

type TableProps = {
    dre: string
}
type SME = {
    dre: string,
    tipoesc: string,
    faixa: string,
    count: number
}

function Table({ dre }: TableProps) {

    const [typeSchools, setTypeEscola] = useState<SME[]>([])

    useEffect(() => {

        axios.get(`https://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/smeescolas/${dre}`)

            .then((response: { data: { results: SME[] } }) => {
                setTypeEscola(response.data.results)
            })
            .catch((error: unknown) => {
                console.log(error);
            })

    }, [dre])

    const formatedSchools = typeSchools.reduce((acumulator: any, value: SME) => {
        if (value.tipoesc in acumulator) {
            acumulator[value.tipoesc] = {
                ...acumulator[value.tipoesc],
                [value.faixa]: value,
                total: acumulator[value.tipoesc].total + value.count
            }
        }
        else {
            acumulator[value.tipoesc] = { [value.faixa]: value, total: value.count }
        }

        return acumulator
    }, {})
    console.log(formatedSchools)
    const schoolKeys = Object.keys(formatedSchools)

    return (
        <main className="content">
            <table className='rTable'>
                <thead>
                    <tr>
                        <th rowSpan={2}></th>
                        <th className='title' colSpan={7}>Escolas Por Tipo e Quantidade de Aluno</th>
                        <th rowSpan={2}>TOTAL UNIDADES ESCOLARES POR TIPO</th>
                    </tr>

                    <tr>
                        <th className='cabecalhoTable'>Sem estudantes cadastrados</th>
                        <th className='cabecalhoTable'>1 a 250 estudantes</th>
                        <th className='cabecalhoTable'>251 a 500 estudantes</th>
                        <th className='cabecalhoTable'>501 a 1000 estudantes</th>
                        <th className='cabecalhoTable'>1001 a 1500 estudantes</th>
                        <th className='cabecalhoTable'>1500 a 2001 estudantes</th>
                        <th className='cabecalhoTable'>2001 a 2500 estudantes</th>
                    </tr>
                </thead>
                {
                    formatedSchools && schoolKeys.map((key) => {

                        return (
                            <tbody>
                                <tr>
                                    <td>{key}</td>
                                    <td>{formatedSchools[key]['Sem estudantes cadastrados']?.count || 0}</td>
                                    <td>{formatedSchools[key]['1 a 250 estudantes']?.count || 0}</td>
                                    <td>{formatedSchools[key]['251 a 500 estudantes']?.count || 0}</td>
                                    <td>{formatedSchools[key]['501 a 1000 estudantes']?.count || 0}</td>
                                    <td>{formatedSchools[key]['1001 a 1500 estudantes']?.count || 0}</td>
                                    <td>{formatedSchools[key]['1500 a 2001 estudantes']?.count || 0}</td>
                                    <td>{formatedSchools[key]['2001 a 2500 estudantes']?.count || 0}</td>
                                    <td>{formatedSchools[key].total}</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
                {
                    <tr>
                        <td>TOTAL DE UNIDADES ESCOLARES POR NÚMERO DE ESTUDANTES</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                }

            </table>
        </main>
    )
}

export default Table