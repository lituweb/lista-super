// components/NuevaListaModal.jsx
import { useState } from "react";
import { X } from "lucide-react";
import { crearLista } from "../services/listasService";

export default function NuevaListaModal({ isOpen, onClose, onListaCreada }) {
  const [titulo, setTitulo] = useState("");
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  if (!isOpen) return null;

  const agregarItem = () => {
    if (item.trim() !== "") {
      setItems([...items, { texto: item, checked: false }]);
      setItem("");
    }
  };

  const guardarLista = async () => {
    if (!titulo) return alert("Poné un título 🙂");
    if (items.length === 0) return alert("Agregá al menos un ítem 🛒");

    const nueva = await crearLista(titulo, items);

    onListaCreada(nueva);
    setTitulo("");
    setItems([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4 text-orange-600">
          Nueva Lista
        </h2>

        {/* Título */}
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título de la lista"
          className="w-full p-2 border rounded-lg mb-4"
        />

        {/* Items */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Agregar ítem"
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            onClick={agregarItem}
            className="bg-orange-400 text-white px-3 rounded-lg hover:bg-orange-500"
          >
            +
          </button>
        </div>

        {/* Lista previa */}
        <ul className="space-y-2 mb-4 max-h-40 overflow-y-auto">
          {items.map((it, i) => (
            <li
              key={i}
              className="p-2 bg-orange-100 rounded-lg text-gray-700"
            >
              {it.texto}
            </li>
          ))}
        </ul>

        {/* Botón guardar */}
        <button
          onClick={guardarLista}
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        >
          Guardar Lista
        </button>
      </div>
    </div>
  );
}
