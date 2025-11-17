import { useRef } from "react";
import DeepChildContext from "../components/DeepChildContext";
import { useCounter } from "../state/context/CounterContext";

export default function ContextDemo() {
    const { launchAlert } = useCounter();
    const renderCount = useRef(0);
    renderCount.current += 1;
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">🟦 Context API Demo</h1>
            <p className="mb-4">El contador está en el componente raíz.</p>
            <div className="bg-yellow-100 p-2 rounded mb-2">
                <strong>Renders: {renderCount.current}</strong>
            </div>
            <button onClick={launchAlert}>
                Lanzar alerta
            </button>
            <div style={{ border: "1px solid white", padding: 10 }}>
                <DeepChildContext />
            </div>
        </div>
    );
}
