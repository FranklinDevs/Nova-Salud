import { useState } from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Inventario from './components/Inventario'
import Ventas from './components/Ventas'
import VentaRapida from './components/VentaRapida'
import AlertaStock from './components/AlertaStock'

function App() {
  const [pestañaActiva, setPestañaActiva] = useState('alertas')

  const renderizarContenido = () => {
    switch (pestañaActiva) {
      case 'alertas':
        return <AlertaStock />
      case 'venta-rapida':
        return <VentaRapida />
      case 'inventario':
        return <Inventario />
      case 'ventas':
        return <Ventas />
      default:
        return <AlertaStock />
    }
  }

  return (
    <>
      <Header />
      <Navigation pestañaActiva={pestañaActiva} onCambiarPestaña={setPestañaActiva} />
      
      {/* CONTENEDOR CENTRADO */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        width: '100%'
      }}>
        <main style={{ 
          padding: "20px", 
          minHeight: "70vh",
          width: '100%',
          maxWidth: '1200px' // Mismo máximo que en el CSS
        }}>
          {renderizarContenido()}
        </main>
      </div>
    </>
  )
}

export default App