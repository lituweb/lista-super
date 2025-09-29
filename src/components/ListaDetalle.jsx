// components/ListaDetalle.jsx
import { useState } from "react";
import { Square, CheckSquare } from "lucide-react";

export default function ListaDetalle({ lista, onTerminar }) {
  const [items, setItems] = useState(lista.items || []);

  const toggleItem = (i) => {
    const nuevos = items.map((it, idx) =>
      idx === i ? { ...it, checked: !it.checked } : it
    );
    setItems(nuevos);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">{lista.titulo}</h1>
      <ul className="space-y-2 mb-6">
        {items.map((item, i) => (
          <li
            key={i}
            onClick={() => toggleItem(i)}
            className="flex items-center gap-2 p-2 bg-orange-100 rounded-lg cursor-pointer hover:bg-orange-200"
          >
            {item.checked ? (
              <CheckSquare className="text-orange-500" />
            ) : (
              <Square />
            )}
            <span className={item.checked ? "line-through" : ""}>{item.texto}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onTerminar}
        className="w-full bg-orange-400 text-white py-2 rounded-lg shadow hover:bg-orange-500"
      >
        Terminar
      </button>
    </div>
  );
}
