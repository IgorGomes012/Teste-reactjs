import { Escola } from "./App"

type SelectProps ={
    escolas: Escola[]
}

function Select(props:SelectProps){
    return (
        <>
            <label htmlFor="cars"></label>
            <select name="cars" id="cars">
                {props.escolas.map((escola) => (
                    <option key={escola.dre} value={escola.dre}>{escola.diretoria}</option>
                ))}
            </select>
        </>
    )
}
export default Select