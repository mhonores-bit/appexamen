import React, { useState } from "react";
import ProductList from "./components/ProductList";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import ProductForm from "./components/ProductForm";
import AuthForm from "./components/AuthForm";
import UploadImage from "./components/UploadImage";

function ProductManagement() {
  const [carrito, setCarrito] = useState([]);
  const [productos] = useState([
    { id: 1, nombre: "Laptop", precio: 1200 },
    { id: 2, nombre: "Mouse", precio: 25 },
    { id: 3, nombre: "Teclado", precio: 45 },
  ]);

  // Agregar producto al carrito
  const addToCarrito = async (producto) => {
    try {
      // Guardar también en Firestore (opcional para Ejercicio 2)
      await addDoc(collection(db, "carrito"), producto);

      setCarrito([...carrito, producto]);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  // Eliminar producto del carrito
  const removeFromCarrito = (id) => {
    setCarrito(carrito.filter((p) => p.id !== id));
  };

  return (
    <><><div className="container mt-4">
      <h1 className="mb-4">Gestión de Productos</h1>

      {/* Lista de productos */}
      <ProductList productos={productos} onAdd={addToCarrito} />

      <h2 className="mt-5">Carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul className="list-group">
          {carrito.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              {item.nombre} - ${item.precio}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCarrito(item.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
      <ProductForm />
      <AuthForm /></>
      <UploadImage /></>
  );
}


export default ProductManagement;
