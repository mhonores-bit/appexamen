import React, { useState } from "react";
import { storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function UploadImage() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMensaje("⚠️ Selecciona un archivo primero.");
      return;
    }

    try {
      const storageRef = ref(storage, `imagenes/${file.name}`);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);
      setUrl(downloadURL);
      setMensaje("✅ Imagen subida con éxito.");
    } catch (error) {
      setMensaje("❌ Error al subir: " + error.message);
    }
  };

  return (
    <div className="card p-4 shadow-sm mt-4">
      <h2 className="mb-3">Subir Imagen</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      <input type="file" className="form-control mb-2" onChange={handleFileChange} />
      <button className="btn btn-primary" onClick={handleUpload}>
        Subir Imagen
      </button>

      {url && (
        <div className="mt-3">
          <p>📎 URL de descarga:</p>
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
          <div className="mt-2">
            <img src={url} alt="Subida" className="img-fluid rounded shadow" />
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadImage;
