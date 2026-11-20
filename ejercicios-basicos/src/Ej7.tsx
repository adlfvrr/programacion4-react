interface ProductoProps{
    nombre: string;
    precio: number;
    stock: number;
    oferta: boolean;
}

export default function ProductosTipados({nombre, precio, stock, oferta}: ProductoProps){

    let mensajeStock: string = stock === 0 ? 'Sin stock' : `Stock: ${stock} unidades`;
    let stockValido: string = !stock ? 'sinStock' : '';

    return(
        <div className='tarjetaProducto'>
            <h4>{nombre}</h4>
            {oferta && <h4>¡Oferta!</h4>}
            <p>${precio}</p>
            <p className={stockValido}>{mensajeStock}</p>
        </div>
    )

}