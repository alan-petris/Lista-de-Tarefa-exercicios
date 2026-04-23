import { useState } from "react";
import "./Contador.css";
export default function Contador() {
    const [count, setCount] = useState<number>(0);
    const handleAddCount = () => {
        setCount((prev) => prev + 1);
    };
    const handleDecreaseCount = () => {
        setCount((prev) => prev - 1);
    };
    return (
        <>
            <h2>Contador</h2>
            <div className="container-contador">
                <p>Contador: {count}</p>
                <button onClick={handleAddCount}>Add count</button>
                <button onClick={handleDecreaseCount}>Remove count</button>
            </div>
        </>
    );
}
