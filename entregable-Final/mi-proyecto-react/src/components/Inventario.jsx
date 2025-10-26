import React, { useEffect, useState } from "react";

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    stock: "",
    precio: "",
  });

  // 🧩 Obtener productos desde el backend
  const obtenerProductos = () => {
    fetch("http://localhost:4000/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al obtener productos:", err));
  };

  // Ejecutar cuando el componente cargue
  useEffect(() => {
    obtenerProductos();
  }, []);

  // 🧩 Manejar envío de formulario para agregar producto
  const manejarSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nuevoProducto.nombre,
        stock: Number(nuevoProducto.stock),
        precio: Number(nuevoProducto.precio),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Producto agregado:", data);
        obtenerProductos(); // Refrescar lista
        setNuevoProducto({ nombre: "", stock: "", precio: "" }); // Limpiar formulario
      })
      .catch((err) => console.error("Error al agregar producto:", err));
  };

  return (
    <div>
      <h2>Inventario de Productos</h2>

      {/* Formulario para agregar producto */}
      <form onSubmit={manejarSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nuevoProducto.nombre}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={nuevoProducto.stock}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
          required
        />
        <button type="submit">Agregar Producto</button>
      </form>

      {/* Tabla de productos */}
      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod._id}>
                <td>{prod.nombre}</td>
                <td>{prod.stock}</td>
                <td>S/ {prod.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Inventario;
