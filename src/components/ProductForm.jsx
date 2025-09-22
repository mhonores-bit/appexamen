import React, { useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

function ProductForm() {
  const [producto, setProducto] = useState({ nombre: "", precio: "" });
  const [mensaje, setMensaje] = useState("");
  const validator = useRef(new SimpleReactValidator({ autoForceUpdate: this }));

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      try {
        await addDoc(collection(db, "productos"), {
          nombre: producto.nombre,
          precio: parseFloat(producto.precio),
        });
        setMensaje("✅ Producto agregado correctamente.");
        setProducto({ nombre: "", precio: "" });
        validator.current.hideMessages();
      } catch (error) {
        console.error("Error al guardar en Firestore:", error);
        setMensaje("❌ Error al guardar el producto.");
      }
    } else {
      validator.current.showMessages();
      setMensaje("⚠️ Revisa los campos.");
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="mb-3">Agregar Producto</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      
      <form onSubmit={handleSubmit}>
        {/* Campo Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={producto.nombre}
            onChange={handleChange}
          />
          <div className="text-danger">
            {validator.current.message("nombre", producto.nombre, "required|min:3")}
          </div>
        </div>

        {/* Campo Precio */}
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            name="precio"
            className="form-control"
            value={producto.precio}
            onChange={handleChange}
          />
          <div className="text-danger">
            {validator.current.message("precio", producto.precio, "required|numeric|min:1")}
          </div>
        </div>

        <button type="submit" className="btn btn-success">
          Guardar Producto
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
