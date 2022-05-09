import { useState, useEffect } from 'react'
import './Table.css'


type TableProps = {
    dre: string
}



const axios = require('axios').default;

function Table({ dre }: TableProps) {

    const [typeSchools, setTypeEscola] = useState<any>([])

    useEffect(() => {

        axios.get(`https://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/smeescolas/${dre || 'JT'}`)

            .then((response: any) => {
                setTypeEscola(response.data.results)

                return response;
            })
            .catch((error: any) => {
                return error;
            })

    }, [dre])

    const formatedSchools = typeSchools.reduce((acumulator: any, value: any) => {
        if (value.tipoesc in acumulator) {
            acumulator[value.tipoesc] = {
                ...acumulator[value.tipoesc],
                [value.faixa]: value
            }
        }
        else {
            acumulator[value.tipoesc] = { [value.faixa]: value }
        }
        return acumulator
    }, {})

    const teste = Object.keys(formatedSchools)

    console.log(formatedSchools)


    return (
        <main className="content">
            <table className='rTable'>
                <thead>
                    <tr>
                        <th rowSpan={1}></th>
                        <th className='title' colSpan={7}>Escolas Por Tipo e Quantidade de Aluno</th>
                        <th rowSpan={2}>TOTAL UNIDADES ESCOLARES POR TIPO</th>
                    </tr>

                    <tr>
                        <th ></th>
                        <th>Sem estudantes cadastrados</th>
                        <th>1 a 250 estudantes</th>
                        <th>251 a 500 estudantes</th>
                        <th>501 a 1000 estudantes</th>
                        <th>1001 a 1500 estudantes</th>
                        <th>1500 a 2001 estudantes</th>
                        <th>2001 a 2500 estudantes</th>
                        <th></th>
                    </tr>
                </thead>
                {
                    formatedSchools && teste.map((key: any) => {
                        const totalPorEscola = (formatedSchools[key]['Sem estudantes cadastrados']?.count || 0) +
                            (formatedSchools[key]['1 a 250 estudantes']?.count || 0) +
                            (formatedSchools[key]['251 a 500 estudantes']?.count || 0) +
                            (formatedSchools[key]['501 a 1000 estudantes']?.count || 0) +
                            (formatedSchools[key]['1001 a 1500 estudantes']?.count || 0) +
                            (formatedSchools[key]['1500 a 2001 estudantes']?.count || 0) +
                            (formatedSchools[key]['2001 a 2500 estudantes']?.count || 0)

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
                                    <td>{totalPorEscola}</td>
                                </tr>
                            </tbody>
                        )

                    })

                }
                {
                    <tr>
                        <td className='totalUnidades'>TOTAL DE UNIDADES ESCOLARES POR NÚMERO DE ESTUDANTES</td>
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