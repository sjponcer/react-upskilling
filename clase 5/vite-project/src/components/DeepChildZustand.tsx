import { useRef } from "react";
import { useCounterStore, useTextStore } from "../state/zustand/useCounterStore";

export default function DeepChildZustand() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="border p-4 rounded bg-gray-100">
      <h2 className="text-lg mb-2">Componente profundo</h2>
      <div className="bg-yellow-100 p-2 rounded mb-2">
        <strong>Renders: {renderCount.current}</strong>
      </div>

      <div style={{ border: "1px solid white", padding: 10 }}>
        <DeepGrandChildZustand />
      </div>
    </div>
  );
}


export function DeepGrandChildZustand() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="border p-4 rounded bg-gray-100">
      <h2 className="text-lg mb-2">Componente muy profundo</h2>
      <div className="bg-yellow-100 p-2 rounded mb-2">
        <strong>Renders: {renderCount.current}</strong>
      </div>
      <div style={{ border: "1px solid white", padding: 10 }}>
        <DeepGreatGrandChildZustand />
      </div>
    </div>
  );
}


export function DeepGreatGrandChildZustand() {
  const renderCount = useRef(0);
  renderCount.current += 1;
  const count = useCounterStore((s) => s.count);
  const setCount = useCounterStore((s) => s.setCount);
  const textoCustom = useTextStore((s) => s.textoCustom);
  return (
    <div className="border p-4 rounded bg-gray-100">
      <h2 className="text-lg mb-2">Componente muy muy profundo</h2>
      <div className="bg-yellow-100 p-2 rounded mb-2">
        <strong>Renders: {renderCount.current}</strong>
      </div>

      <p className="text-md">Count: {count}</p>
      <p className="text-md">Texto Custom: {textoCustom}</p>
      <button
        className="px-3 py-1 mt-2 bg-green-600 text-white rounded"
        onClick={() => setCount(count + 1)}
      >
        Incrementar
      </button>
    </div>
  );
}

