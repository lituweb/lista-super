// App.jsx
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { db } from "./firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import ListaDetalle from "./components/ListaDetalle";
import RevisarCompras from "./components/RevisarCompras";
import NuevaListaModal from "./components/NuevaListaModal"; // 👈 importar modal

export default function App() {
  const [listas, setListas] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState("a comprar");
  const [vista, setVista] = useState("principal"); // principal | detalle | revisar
  const [listaSeleccionada, setListaSeleccionada] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // 👈 controlar modal

  // Cargar listas
  useEffect(() => {
    const cargar = async () => {
      const snapshot = await getDocs(collection(db, "listas"));
      setListas(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    cargar();
  }, []);

  const abrirLista = (lista) => {
    setListaSeleccionada(lista);
    setVista("detalle");
  };

  const actualizarEstadoLista = async (id, estado) => {
    await updateDoc(doc(db, "listas", id), { estado });
    setListas(listas.map((l) => (l.id === id ? { ...l, estado } : l)));
    setVista("principal");
  };

  return (
    <div className="min-h-screen bg-orange-50 text-gray-800 p-6">
      {vista === "principal" && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Las Listas</h1>
          <div className="flex gap-2 mb-4">
            {["a comprar", "listo"].map((estado) => (
              <button
                key={estado}
                onClick={() => setEstadoFiltro(estado)}
                className={`px-4 py-2 rounded-lg ${
                  estadoFiltro === estado
                    ? "bg-orange-400 text-white"
                    : "bg-orange-100"
                }`}
              >
                {estado}
              </button>
            ))}
          </div>

          <div className="grid gap-4">
            {listas
              .filter((l) => l.estado === estadoFiltro)
              .map((lista) => (
                <div
                  key={lista.id}
                  onClick={() => abrirLista(lista)}
                  className="p-4 bg-orange-100 rounded-xl shadow cursor-pointer hover:bg-orange-200 transition"
                >
                  <h2 className="font-semibold">{lista.titulo}</h2>
                </div>
              ))}
          </div>

          {/* Botón para abrir modal */}
          <button
            onClick={() => setModalOpen(true)}
            className="fixed bottom-6 right-6 bg-orange-400 text-white p-4 rounded-full shadow-lg hover:bg-orange-500"
          >
            <Plus />
          </button>
        </div>
      )}

      {vista === "detalle" && (
        <ListaDetalle
          lista={listaSeleccionada}
          onTerminar={() => setVista("revisar")}
        />
      )}

      {vista === "revisar" && (
        <RevisarCompras
          lista={listaSeleccionada}
          onListo={() => actualizarEstadoLista(listaSeleccionada.id, "listo")}
        />
      )}

      {/* Modal de nueva lista */}
      <NuevaListaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onListaCreada={(nueva) => setListas([...listas, nueva])}
      />
    </div>
  );
}
