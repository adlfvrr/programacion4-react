import './App.css'
import Producto from './Ej1'
import Contador from './Ej2'
import MostrarOcultar from './Ej3'
import ConversorTemperatura from './Ej4'
import ListaCompras from './Ej5'
import Buscador from './Ej6'
import ProductosTipados from './Ej7'


function App() {

  return (
   <div>
    <h2>Ejercicio 1</h2>
      <div className='ejercicio-1'>
        <Producto precio={4500} nombre='Teclado' stock={12}></Producto>
        <Producto precio={6000} nombre='Auriculares' stock={0}></Producto>
        <Producto precio={2000} nombre='Mouse' stock={6}></Producto>
      </div>
    <h2>Ejercicio 2</h2>
      <div className='ejercicio-2'>
        <Contador></Contador>
      </div>
    <h2>Ejercicio 3</h2>
      <div className='ejercicio-3'>
        <MostrarOcultar></MostrarOcultar>
      </div>
    <h2>Ejercicio 4</h2>
      <div className='ejercicio-4'>
        <ConversorTemperatura></ConversorTemperatura>
      </div>
    <h2>Ejercicio 5</h2>
      <div className='ejercicio-5'>
        <ListaCompras></ListaCompras>
      </div>
    <h2>Ejercicio 6</h2>
      <div className='ejercicio-6'>
        <Buscador></Buscador>
      </div>
    <h2>Ejercicio 7</h2>
      <div className='ejercicio-7'>
        <ProductosTipados precio={4500} nombre='Teclado' stock={12} oferta={true}></ProductosTipados>
        <ProductosTipados precio={6000} nombre='Auriculares' stock={0} oferta={false}></ProductosTipados>
      </div>
   </div>
  )
}

export default App
