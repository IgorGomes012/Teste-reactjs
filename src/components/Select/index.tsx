import { ChangeEvent } from "react"
import { Escola } from "../App" 
import './Select.css'


type SelectProps = {
    escolas: Escola[]
    setDre: (dre: string) => void
}

function Select({escolas,setDre}: SelectProps) {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setDre(event.currentTarget.value)
    }
    return (
        <>
            <label htmlFor="cars"></label>
            <select name="cars" id="cars" onChange={handleChange}>
                {escolas.map((escola) => (
                    <option key={escola.dre} value={escola.dre}>{escola.diretoria}</option>
                ))}
            </select>
        </>
    )
}
export default Select