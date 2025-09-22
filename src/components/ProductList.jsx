import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ productos, onAdd }) {
  return (
    <div>
      <h2>Lista de Productos</h2>
      <div className="row">
        {productos.map((producto) => (
          <div key={producto.id} className="col-md-4 mb-3">
            <ProductItem producto={producto} onAdd={onAdd} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
