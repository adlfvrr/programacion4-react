import { useState, type ChangeEvent } from "react";

export default function ConversorTemperatura(){

    const [grados, setGrados] = useState(0);

    let conversionFahrenheit: number = Number(grados) * 9/5 + 32;

    const HandleType = (e : ChangeEvent<HTMLInputElement>) => {
        let numeroInput = Number(e.currentTarget.value);
        setGrados(numeroInput);
    }

    return(
        <div>
            <input type="text" placeholder="Ej: 67" onChange={HandleType}/> 

            <h2>{conversionFahrenheit} °F</h2>
        </div>
    )
}