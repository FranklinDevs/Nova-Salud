function Navigation({ pestañaActiva, onCambiarPestaña }) {
  const pestañas = [
    { id: 'alertas', nombre: '🚨 Alertas Stock', componente: 'AlertaStock' },
    { id: 'venta-rapida', nombre: '⚡ Venta Rápida', componente: 'VentaRapida' },
    { id: 'inventario', nombre: '📦 Gestión Inventario', componente: 'Inventario' },
    { id: 'ventas', nombre: '💰 Registro Ventas', componente: 'Ventas' }
  ]

  return (
    // CONTENEDOR CENTRADO PARA LA NAVEGACIÓN
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <nav style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '15px 20px',
        borderBottom: '2px solid #0074D9',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '1200px'
      }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {pestañas.map(pestaña => (
            <button
              key={pestaña.id}
              onClick={() => onCambiarPestaña(pestaña.id)}
              style={{
                padding: '12px 24px',
                backgroundColor: pestañaActiva === pestaña.id ? '#0074D9' : 'white',
                color: pestañaActiva === pestaña.id ? 'white' : '#0074D9',
                border: `2px solid #0074D9`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                minWidth: '150px'
              }}
            >
              {pestaña.nombre}
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Navigation