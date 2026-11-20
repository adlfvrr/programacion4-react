import { useState } from "react";

export default function MostrarOcultar(){

    const [visible, setVisible] = useState(true);
    const AlternarVisible = () => setVisible(!visible);

    let mensajeBoton: string = visible ? 'Ocultar respuesta' : 'Mostrar respuesta';

    return(
        <div>
            <h2>¿Qué es JSX?</h2>
            <button onClick={AlternarVisible} className='boton'>
            {mensajeBoton}
            </button>
            {visible && <p className="respuesta-mostrada">Una sintáxis que permite escribir estructura parecida a HTML dentro de JavaScript. Se transforma en llamadas a funciones de React.</p>}
        </div>
    )

}
