// src/components/Ventas.jsx
import { useState, useEffect } from "react";

function Ventas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/ventas")
      .then(res => res.json())
      .then(data => setVentas(data))
      .catch(err => console.error("Error al cargar ventas:", err));
  }, []);

  return (
    <section style={{ marginTop: "30px" }}>
      <h2>📜 Registro de Ventas</h2>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead style={{ backgroundColor: "#0074D9", color: "white" }}>
          <tr>
            <th>Cliente</th>
            <th>Productos</th>
            <th>Total (S/.)</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((v, i) => (
            <tr key={i}>
              <td>{v.cliente}</td>
              <td>
                {v.productos.map(p => (
                  <div key={p.nombre}>
                    {p.nombre} (x{p.cantidad}) - S/. {p.subtotal.toFixed(2)}
                  </div>
                ))}
              </td>
              <td>S/. {v.total.toFixed(2)}</td>
              <td>{new Date(v.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Ventas;
