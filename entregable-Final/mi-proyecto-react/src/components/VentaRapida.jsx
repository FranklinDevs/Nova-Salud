// src/components/VentaRapida.jsx
import { useState, useEffect } from "react";

function VentaRapida() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cliente, setCliente] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // 🔄 Cargar productos desde el backend
  useEffect(() => {
    fetch("http://localhost:4000/productos")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  // ➕ Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item._id === producto._id);
    if (existe) {
      setCarrito(carrito.map(item =>
        item._id === producto._id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // ❌ Eliminar producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item._id !== id));
  };

  // 🔢 Actualizar cantidad
  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) return eliminarDelCarrito(id);
    setCarrito(carrito.map(item =>
      item._id === id ? { ...item, cantidad: nuevaCantidad } : item
    ));
  };

  // 💰 Calcular total
  const calcularTotal = () =>
    carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);

  // 🧾 Procesar venta (Guardar en MongoDB)
  const procesarVenta = async () => {
    if (carrito.length === 0) {
      alert("⚠️ El carrito está vacío");
      return;
    }
    if (!cliente.trim()) {
      alert("⚠️ Ingresa el nombre del cliente");
      return;
    }

    const total = calcularTotal();
    const venta = {
      cliente,
      productos: carrito.map(item => ({
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio: item.precio,
        subtotal: item.precio * item.cantidad,
      })),
      total,
    };

    try {
      const res = await fetch("http://localhost:4000/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(venta),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.mensaje);
        setCarrito([]);
        setCliente("");
      } else {
        alert("❌ Error al registrar la venta: " + data.error);
      }
    } catch (error) {
      console.error("Error al procesar venta:", error);
      alert("⚠️ No se pudo conectar con el servidor.");
    }
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section style={{ marginTop: "30px", backgroundColor: "#1cb5dbff", padding: "20px", borderRadius: "10px" }}>
      <h2>⚡ Venta Rápida</h2>

      <input
        type="text"
        placeholder="🔍 Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ width: "100%", marginBottom: "20px", padding: "10px" }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
        {/* 🧱 Lista de productos */}
        <div>
          <h3>Productos disponibles</h3>
          {productosFiltrados.map(p => (
            <div key={p._id} style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <div>
                <strong>{p.nombre}</strong><br />
                <small>Precio: S/. {p.precio} | Stock: {p.stock}</small>
              </div>
              <button
                onClick={() => agregarAlCarrito(p)}
                disabled={p.stock === 0}
                style={{ backgroundColor: "#0074D9", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px" }}
              >
                ➕ Agregar
              </button>
            </div>
          ))}
        </div>

        {/* 🛒 Carrito */}
        <div>
          <h3>Carrito</h3>
          <input
            type="text"
            placeholder="👤 Nombre del cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />

          {carrito.length === 0 ? (
            <p>No hay productos en el carrito</p>
          ) : (
            carrito.map(item => (
              <div key={item._id} style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <div>
                  <strong>{item.nombre}</strong> <br />
                  <small>S/. {item.precio} x {item.cantidad}</small>
                </div>
                <div>
                  <button onClick={() => actualizarCantidad(item._id, item.cantidad - 1)}>-</button>
                  <span style={{ margin: "0 10px" }}>{item.cantidad}</span>
                  <button onClick={() => actualizarCantidad(item._id, item.cantidad + 1)}>+</button>
                  <button onClick={() => eliminarDelCarrito(item._id)} style={{ marginLeft: "10px" }}>🗑️</button>
                </div>
              </div>
            ))
          )}

          {carrito.length > 0 && (
            <>
              <h4>Total: S/. {calcularTotal().toFixed(2)}</h4>
              <button
                onClick={procesarVenta}
                style={{ backgroundColor: "#28a745", color: "white", border: "none", padding: "10px", borderRadius: "5px", width: "100%" }}
              >
                💳 Procesar Venta
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default VentaRapida;
