import { useState, type ChangeEvent } from "react"


export default function ListaCompras(){

    const [inputTexto, setInputTexto] = useState('');
    const [listaCompras, setListaCompras] = useState<string[]>([]);

    const HandleAgregar = () => {
        
        const producto: string = inputTexto;
        if (producto) {
            setListaCompras([...listaCompras, producto]);
            setInputTexto('');
        }
    }

    const handleEliminar = (idxAEliminar: number) => {
        setListaCompras(listaCompras.filter((_, idx) => idx !== idxAEliminar))
    }
    
    const CargarLista = () => {
        return (
            <ul>
                {
                    listaCompras.map((prod, idx) => (
                        <li key={idx}>
                            <h3>{prod}</h3>
                            <button onClick={() => handleEliminar(idx)}>Eliminar</button>
                        </li>
                    ))
                }
            </ul> 
        )
    }

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setInputTexto(e.currentTarget.value)
    }

    return(
        <div>
            <input type="text" value={inputTexto} onChange={handleChange} placeholder="Ej: Papel"/>
            <button className="boton" onClick={HandleAgregar}>Agregar</button>
            {(listaCompras.length === 0) ? <p>No hay productos para comprar</p> : CargarLista()}
        </div>
        )
}