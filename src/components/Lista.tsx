import "./Lista.css";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

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

    const [editandoId, setEditandoId] = useState<number | null>();
    const [valorEdicao, setValorEdicao] = useState<string>("");

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
                    return { ...item, text: text };
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
            <Input
                type="text"
                name=""
                id=""
                placeholder="Digite um item"
                value={valorInput}
                onChange={(e) => setValorInput(e.target.value)}
            />
            <Button onClick={handleAdd}>Add</Button>

            <div>
                <p>Filtros disponíveis</p>
                <Button onClick={() => setFiltro("concluidas")}>
                    Concluídas {concluidas}
                </Button>
                <Button onClick={() => setFiltro("pendentes")}>
                    Pendentes {pendentes}
                </Button>
                <Button onClick={() => setFiltro("todas")}>
                    Todas {total}
                </Button>
            </div>

            <p>Filtro atual: {filtro}</p>
            <Button onClick={limparConcluidas}>Excluir completas</Button>
            <Button onClick={concluirTodas}>Concluir todas tarefas</Button>
            <Button onClick={alternarTodas}>Alternar Todas</Button>
            <Button onClick={resetarTodas}>Resetar todas</Button>
            <Button onClick={marcarDoisPrimeiros}>Marcar 2 primeiros</Button>
            <div className="container-lista">
                <ul>
                    <p>Tarefas: {listaFiltrada.length}</p>
                    {listaFiltrada.map((item) => (
                        <li key={item.id}>
                            {editandoId === item.id ? (
                                <Input
                                    type="text"
                                    value={valorEdicao}
                                    onChange={(e) =>
                                        setValorEdicao(e.target.value)
                                    }
                                />
                            ) : (
                                <span
                                    style={{
                                        textDecoration: item.completed
                                            ? "line-through"
                                            : "none",
                                    }}
                                >
                                    {item.text}
                                </span>
                            )}

                            <Button onClick={() => removerItem(item.id)}>
                                Excluir
                            </Button>
                            <Button onClick={() => toggleConcluido(item.id)}>
                                Concluir
                            </Button>
                            <Button
                                onClick={() => {
                                    if (editandoId === item.id) {
                                        editarTarefa(item.id, valorEdicao);
                                        setEditandoId(null);
                                    } else {
                                        setEditandoId(item.id);
                                        setValorEdicao(item.text);
                                    }
                                }}
                            >
                                {editandoId === item.id ? "Salvar" : "Editar"}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
