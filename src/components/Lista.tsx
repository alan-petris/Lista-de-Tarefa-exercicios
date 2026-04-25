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
        if (valorInput.trim()) {
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

    const limparConcluidas = () => {
        setLista((prev) => prev.filter((item) => !item.completed));
    };

    const listaFiltrada = lista.filter((item) => {
        if (filtro === "concluidas") return item.completed;
        if (filtro === "pendentes") return !item.completed;
        return true; // todas
    });

    const concluirTodas = () => {
        setLista((prev) =>
            prev.map((item) => {
                if (!item.completed) {
                    return { ...item, completed: !item.completed };
                }
                return item;
            }),
        );
    };

    const alternarTodas = () => {
        setLista((prev) =>
            prev.map((item) => {
                return { ...item, completed: !item.completed };
            }),
        );
    };

    const resetarTodas = () => {
        setLista((prev) =>
            prev.map((item) => {
                return { ...item, completed: false };
            }),
        );
    };
    const marcarDoisPrimeiros = () => {
        setLista((prev) =>
            prev.map((item, index) => {
                if (index === 0 || index === 1) {
                    return { ...item, completed: true };
                }
                return item;
            }),
        );
    };

    const editarTarefa = (id: number, text: string) => {
        setLista((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    return { ...item, text: "mudei" };
                }
                return item;
            }),
        );
    };

    // Fazer alteração para gerar o commit
    const total = lista.length;
    const concluidas = lista.filter((item) => item.completed).length;
    const pendentes = total - concluidas;
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

            <div>
                <p>Filtros disponíveis</p>
                <button onClick={() => setFiltro("concluidas")}>
                    Concluídas {concluidas}
                </button>
                <button onClick={() => setFiltro("pendentes")}>
                    Pendentes {pendentes}
                </button>
                <button onClick={() => setFiltro("todas")}>
                    Todas {total}
                </button>
            </div>

            <p>Filtro atual: {filtro}</p>
            <button onClick={limparConcluidas}>Excluir completas</button>
            <button onClick={concluirTodas}>Concluir todas tarefas</button>
            <button onClick={alternarTodas}>Alternar Todas</button>
            <button onClick={resetarTodas}>Resetar todas</button>
            <button onClick={marcarDoisPrimeiros}>Marcar 2 primeiros</button>
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
                            <button
                                onClick={() => editarTarefa(item.id, item.text)}
                            >
                                Editar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
