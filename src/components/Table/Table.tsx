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
        <main>
            <table>
                <tr>
                    <th></th>
                    <th>Sem estudantes cadastrados</th>
                    <th>1 a 250 estudantes</th>
                    <th>251 a 500 estudantes</th>
                    <th>501 a 1000 estudantes</th>
                    <th>1001 a 1500 estudantes</th>
                    <th>1500 a 2001 estudantes</th>
                    <th>2001 a 2500 estudantes</th>
                    <th>Total Unidades Escolares Por Tipo</th>
                </tr>
                {
                    formatedSchools && teste.map((key:any)=>{
                        const totalEscola = (formatedSchools[key]['Sem estudantes cadastrados']?.count || 0) +
                        (formatedSchools[key]['1 a 250 estudantes']?.count || 0) + 
                        (formatedSchools[key]['251 a 500 estudantes']?.count || 0) +
                        (formatedSchools[key]['501 a 1000 estudantes']?.count || 0) +
                        (formatedSchools[key]['1001 a 1500 estudantes']?.count || 0) +
                        (formatedSchools[key]['1500 a 2001 estudantes']?.count || 0) +
                        (formatedSchools[key]['2001 a 2500 estudantes']?.count || 0)

                        return (
                            <tr>
                               <td>{key}</td>
                               <td>{formatedSchools[key]['Sem estudantes cadastrados']?.count || 0}</td>
                               <td>{formatedSchools[key]['1 a 250 estudantes']?.count || 0}</td>
                               <td>{formatedSchools[key]['251 a 500 estudantes']?.count || 0}</td>
                               <td>{formatedSchools[key]['501 a 1000 estudantes']?.count || 0}</td>
                               <td>{formatedSchools[key]['1001 a 1500 estudantes']?.count || 0}</td>
                               <td>{formatedSchools[key]['1500 a 2001 estudantes']?.count || 0}</td>
                               <td>{formatedSchools[key]['2001 a 2500 estudantes']?.count || 0}</td>
                               <td>{totalEscola}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </main>
    )
}

export default Table