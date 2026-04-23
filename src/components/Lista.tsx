import "./Lista.css";
import { useState } from "react";

type ListaProps = {
    id: number;
    text: string;
    completed: boolean;
};
export default function Lista() {
    const [lista, setLista] = useState<ListaProps[]>([
        { id: 1, text: "Banana", completed: false },
        { id: 2, text: "Morango", completed: false },
        { id: 3, text: "Abacaxi", completed: false },
        { id: 4, text: "Limão", completed: false },
    ]);
    const [filtro, setFiltro] = useState<"todas" | "concluidas" | "pendentes">(
        "todas",
    );
    const [valorInput, setValorInput] = useState<string>("");
    const handleAdd = () => {
        if (valorInput) {
            setLista([
                ...lista,
                { id: Date.now(), text: valorInput.trim(), completed: false },
            ]);
            setValorInput("");
        }
    };

    const removerItem = (id: number) => {
        setLista((prev) => prev.filter((item) => item.id !== id));
    };

    const toggleConcluido = (id: number) => {
        setLista((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    return { ...item, completed: !item.completed };
                }
                return item;
            }),
        );
    };

    const listaFiltrada = lista.filter((item) => {
        if (filtro === "concluidas") return item.completed;
        if (filtro === "pendentes") return !item.completed;
        return true; // todas
    });
    return (
        <>
            <h2>Lista de items</h2>
            <input
                type="text"
                name=""
                id=""
                placeholder="Digite um item"
                value={valorInput}
                onChange={(e) => setValorInput(e.target.value)}
            />
            <button onClick={handleAdd}>Add</button>
            <button onClick={() => setFiltro("concluidas")}>
                Concluídas {listaFiltrada.length}
            </button>
            <button onClick={() => setFiltro("pendentes")}>
                Pendentes {listaFiltrada.length}
            </button>
            <button onClick={() => setFiltro("todas")}>
                Todas {lista.length}
            </button>
            <p>Filtro atual: {filtro}</p>
            <div className="container-lista">
                <ul>
                    <p>Tarefas: {listaFiltrada.length}</p>
                    {listaFiltrada.map((item) => (
                        <li key={item.id}>
                            <span
                                style={{
                                    textDecoration: item.completed
                                        ? "line-through"
                                        : "none",
                                }}
                            >
                                {item.text}
                            </span>
                            <button onClick={() => removerItem(item.id)}>
                                Excluir
                            </button>
                            <button onClick={() => toggleConcluido(item.id)}>
                                Concluir
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
