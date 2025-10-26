// src/components/AlertaStock.jsx
import { useState, useEffect } from "react"

function AlertaStock() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Paracetamol", stock: 25, precio: 3.50, stockMinimo: 10 },
    { id: 2, nombre: "Ibuprofeno", stock: 10, precio: 4.00, stockMinimo: 5 },
    { id: 3, nombre: "Omeprazol", stock: 5, precio: 5.20, stockMinimo: 8 },
    { id: 4, nombre: "Amoxicilina", stock: 30, precio: 7.80, stockMinimo: 15 },
  ])

  const [alertas, setAlertas] = useState([])

  // Generar alertas automáticamente
  useEffect(() => {
    const nuevasAlertas = []
    
    productos.forEach(producto => {
      if (producto.stock === 0) {
        nuevasAlertas.push({
          tipo: "critica",
          mensaje: `❌ ${producto.nombre} - AGOTADO - Urgente reabastecer`,
          producto: producto,
          prioridad: "alta"
        })
      } else if (producto.stock <= producto.stockMinimo) {
        nuevasAlertas.push({
          tipo: "advertencia", 
          mensaje: `⚠️ ${producto.nombre} - Stock bajo (${producto.stock} unidades) - Mínimo: ${producto.stockMinimo}`,
          producto: producto,
          prioridad: "media"
        })
      }
    })

    setAlertas(nuevasAlertas)
  }, [productos])

  // Productos con stock bajo
  const productosStockBajo = productos.filter(p => p.stock <= p.stockMinimo)

  return (
    <section style={{ marginTop: "30px", backgroundColor: "#27c3c5ff", padding: "20px", borderRadius: "10px", border: "1px solid #ffeaa7" }}>
      <h2>🚨 Sistema de Alertas - Gestión Optimizada</h2>
      
      {/* Resumen de alertas */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Resumen del Sistema</h3>
        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
          <div style={{ padding: "10px", backgroundColor: "#029d95ff", borderRadius: "5px", flex: 1 }}>
            <strong>Total Productos:</strong> {productos.length}
          </div>
          <div style={{ padding: "10px", backgroundColor: "#06a6a4ff", borderRadius: "5px", flex: 1 }}>
            <strong>Con Stock Bajo:</strong> {productosStockBajo.length}
          </div>
          <div style={{ padding: "10px", backgroundColor: "#1a7b9bff", borderRadius: "5px", flex: 1 }}>
            <strong>Alertas Activas:</strong> {alertas.length}
          </div>
        </div>
      </div>

      {/* Alertas en tiempo real */}
      <div style={{ marginBottom: "25px" }}>
        <h3>🔔 Alertas del Sistema</h3>
        {alertas.length === 0 ? (
          <div style={{ 
            padding: "15px", 
            backgroundColor: "#d4edda", 
            borderRadius: "5px",
            textAlign: "center",
            color: "#155724"
          }}>
            ✅ No hay alertas críticas en este momento
          </div>
        ) : (
          <div>
            {alertas.map((alerta, index) => (
              <div
                key={index}
                style={{
                  padding: "12px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  backgroundColor: alerta.tipo === "critica" ? "#f8d7da" : "#fff3cd",
                  border: alerta.tipo === "critica" ? "1px solid #f5c6cb" : "1px solid #ffeaa7",
                  color: alerta.tipo === "critica" ? "#721c24" : "#856404",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <span>{alerta.mensaje}</span>
                <button
                  onClick={() => {
                    // Navegar automáticamente al inventario para editar
                    document.getElementById('inventario-section')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: alerta.tipo === "critica" ? "#dc3545" : "#ffc107",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer"
                  }}
                >
                  📋 Reabastecer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabla de productos con stock bajo */}
      {productosStockBajo.length > 0 && (
        <div>
          <h3>📊 Productos que Necesitan Atención</h3>
          <table border="1" cellPadding="10" style={{ 
            borderCollapse: "collapse", 
            width: "100%", 
            backgroundColor: "blue",
            borderRadius: "5px",
            overflow: "hidden"
          }}>
            <thead style={{ backgroundColor: "#dc3545", color: "white" }}>
              <tr>
                <th>Producto</th>
                <th>Stock Actual</th>
                <th>Stock Mínimo</th>
                <th>Diferencia</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {productosStockBajo.map(producto => (
                <tr key={producto.id}>
                  <td>
                    <strong>{producto.nombre}</strong>
                  </td>
                  <td style={{ 
                    color: producto.stock === 0 ? "#dc3545" : "#e67e22",
                    fontWeight: "bold"
                  }}>
                    {producto.stock}
                  </td>
                  <td>{producto.stockMinimo}</td>
                  <td style={{ 
                    color: producto.stock === 0 ? "#dc3545" : "#e67e22",
                    fontWeight: "bold"
                  }}>
                    {producto.stock - producto.stockMinimo}
                  </td>
                  <td>
                    <span style={{
                      padding: "4px 8px",
                      borderRadius: "3px",
                      fontSize: "0.8em",
                      fontWeight: "bold",
                      backgroundColor: producto.stock === 0 ? "#dc3545" : "#f39c12",
                      color: "white"
                    }}>
                      {producto.stock === 0 ? "AGOTADO" : "STOCK BAJO"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Recomendaciones automáticas */}
      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#159fb8ff", borderRadius: "5px" }}>
        <h4>💡 Recomendaciones del Sistema</h4>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          {productosStockBajo.length > 0 && (
            <li>Realizar pedido de reposición para {productosStockBajo.length} productos</li>
          )}
          {alertas.some(a => a.tipo === "critica") && (
            <li>Productos agotados necesitan atención inmediata</li>
          )}
          <li>Revisar niveles de stock mínimo según temporada</li>
        </ul>
      </div>
    </section>
  )
}

export default AlertaStock