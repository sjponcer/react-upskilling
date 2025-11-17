import { useState, useRef } from "react";
import DeepChild from "../components/DeepChild";

export default function PropDrillingDemo() {
    const [count, setCount] = useState(0);
    const renderCount = useRef(0);
    renderCount.current += 1;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">🔥 Prop Drilling Demo</h1>
            <p className="mb-4">El contador está en el componente raíz.</p>
            <div className="bg-yellow-100 p-2 rounded mb-2">
                <strong>Renders: {renderCount.current}</strong>
            </div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Incrementar
            </button>
            <div style={{ border: "1px solid white", padding: 10 }}>

                <DeepChild count={count} setCount={setCount} />
            </div>
        </div>
    );
}