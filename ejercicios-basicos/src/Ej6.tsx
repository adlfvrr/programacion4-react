import { useState, type ChangeEvent } from "react";


export default function Buscador(){

    const listaLenguajes= ['JavaScript', 'Java', 'Python', 'Go', 'C#', 'C++'];
    const [inputTexto, setInputTexto] = useState('');

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
            setInputTexto(e.currentTarget.value)
    }

    const listaFiltrada = listaLenguajes.filter(lenguaje => 
                lenguaje.toLowerCase().includes(inputTexto.toLowerCase()));

    return(
        <div>
            <p>{listaFiltrada.length} resultados</p>
            <input type="text" onChange={handleChange}/>
            
            <ul>
                {
                
                listaFiltrada.map((lenguaje, idx) => (
                    <li key={idx}>
                        <h3>{lenguaje}</h3>
                    </li>
                ))}
            </ul>
        </div>
    )

}