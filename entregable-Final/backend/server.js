import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Producto from "./models/producto.js";
import Venta from "./models/Venta.js";

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Conexión a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/boticaDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.error("❌ Error al conectar con MongoDB:", err));

// ======================
// Productos
// ======================

// Obtener todos los productos
app.get("/productos", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar un nuevo producto
app.post("/productos", async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;

    if (!nombre || precio == null || stock == null) {
      return res.status(400).json({ error: "Faltan datos del producto" });
    }

    const nuevoProducto = new Producto({ nombre, precio, stock });
    const guardado = await nuevoProducto.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// Ventas
// ======================

// Obtener todas las ventas
app.get("/ventas", async (req, res) => {
  try {
    const ventas = await Venta.find();
    res.json(ventas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Registrar una venta
app.post("/ventas", async (req, res) => {
  try {
    const { cliente, productos, total } = req.body;

    if (!cliente || !productos || !total) {
      return res.status(400).json({ error: "Faltan datos de la venta" });
    }

    const nuevaVenta = new Venta({ cliente, productos, total });
    await nuevaVenta.save();

    // Actualizar stock de productos
    for (const item of productos) {
      await Producto.updateOne(
        { nombre: item.nombre },
        { $inc: { stock: -item.cantidad } }
      );
    }

    res.json({ mensaje: "✅ Venta registrada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// Servidor
// ======================

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
