// src/services/listasService.js
import { db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

// Obtener todas las listas
export const obtenerListas = async () => {
  const snapshot = await getDocs(collection(db, "listas"));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// Crear una lista con título e ítems
export const crearLista = async (titulo, items) => {
  const nueva = {
    titulo,
    estado: "a comprar",
    items, // se guarda directamente en Firestore
  };
  const ref = await addDoc(collection(db, "listas"), nueva);
  return { id: ref.id, ...nueva };
};

// Actualizar estado de lista
export const actualizarEstado = async (id, estado) => {
  await updateDoc(doc(db, "listas", id), { estado });
};
