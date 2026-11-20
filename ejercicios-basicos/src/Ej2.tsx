import { useState } from "react";

export default function Contador(){
    const [contador, setContador] = useState(0);

    const Incrementar = () => {
        if (contador < 10) {
            setContador(() => contador + 1);
        }
    }
    const Decrementar = () => {
        if (contador > 0) {
            setContador(() => contador - 1);
        }
    }

    let limiteContador: boolean = contador === 10 || contador === 0 ? true : false;

    return(
        <div>
            <h2>{contador}</h2>
            <button onClick={Decrementar} disabled={contador === 0} className={`boton ${contador === 0 ? 'boton-inhabilitado':''}`}>-</button>
            <button onClick={Incrementar} disabled={contador === 10} className={`boton ${contador === 10 ? 'boton-inhabilitado':''}`}>+</button>
            {limiteContador && <p>Llegaste al límite</p>}
        </div>
    )

}