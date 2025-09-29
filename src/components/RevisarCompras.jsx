// components/RevisarCompras.jsx
export default function RevisarCompras({ lista, onListo }) {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Revisa las compras</h1>
      <ul className="space-y-2 mb-6">
        {lista.items.map((item, i) => (
          <li key={i} className="p-2 bg-orange-100 rounded-lg">
            {item.texto}
          </li>
        ))}
      </ul>
      <button
        onClick={onListo}
        className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600"
      >
        Listo
      </button>
    </div>
  );
}
