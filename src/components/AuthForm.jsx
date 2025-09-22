import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setMensaje("✅ Usuario registrado correctamente.");
    } catch (error) {
      setMensaje("❌ Error al registrar: " + error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setMensaje("✅ Sesión iniciada correctamente.");
    } catch (error) {
      setMensaje("❌ Error al iniciar sesión: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setMensaje("👋 Sesión cerrada.");
    } catch (error) {
      setMensaje("❌ Error al cerrar sesión: " + error.message);
    }
  };

  return (
    <div className="card p-4 shadow-sm mt-4">
      <h2 className="mb-3">Autenticación</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      {user ? (
        <div>
          <p>Bienvenido, {user.email}</p>
          <button className="btn btn-danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary me-2" onClick={handleLogin}>
            Iniciar Sesión
          </button>
          <button className="btn btn-success" onClick={handleRegister}>
            Registrarse
          </button>
        </div>
      )}
    </div>
  );
}

export default AuthForm;
