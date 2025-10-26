import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  productos: [
    {
      nombre: { type: String, required: true },
      cantidad: { type: Number, required: true },
      precio: { type: Number, required: true },
      subtotal: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

const Venta = mongoose.model("Venta", ventaSchema);

export default Venta;
