import React from "react";

function ProductItem({ producto, onAdd }) {
  return (
    <div className="card p-3">
      <h5>{producto.nombre}</h5>
      <p>Precio: ${producto.precio}</p>
      <button className="btn btn-primary" onClick={() => onAdd(producto)}>
        Agregar al Carrito
      </button>
    </div>
  );
}

export default ProductItem;
