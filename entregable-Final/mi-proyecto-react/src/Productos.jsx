import React, { useEffect, useState } from "react";

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Conectamos con el backend
    fetch("http://localhost:4000/productos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos recibidos del backend:", data);
        setProductos(data);
      })
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Productos</h1>
      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, index) => (
              <tr key={index}>
                <td>{p.nombre}</td>
                <td>{p.stock}</td>
                <td>S/ {p.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Productos;
