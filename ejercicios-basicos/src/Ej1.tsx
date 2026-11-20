
export default function Producto({nombre, precio, stock}) {
    
    let mensajeStock: string = stock === 0 ? 'Sin stock' : `Stock: ${stock} unidades`;
    let stockValido: string = !stock ? 'sinStock' : '';

    return(
        <div className='tarjetaProducto'>
            <h4>{nombre}</h4>
            <p>${precio}</p>
            <p className={stockValido}>{mensajeStock}</p>
        </div>
    )

}