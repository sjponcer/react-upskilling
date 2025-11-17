import { useRef } from "react";
import { useCounterStore, useTextStore } from "../state/zustand/useCounterStore";
import DeepChildZustand from "../components/DeepChildZustand";

export default function ZustandDemo() {
  // Only subscribe to launchAlert - won't rerender on count changes!
  const launchAlert = useCounterStore((s) => s.launchAlert);
  const renderCount = useRef(0);
  renderCount.current += 1;
  const setTextoCustom = useTextStore((s) => s.setTextoCustom);
  const textoCustom = useTextStore((s) => s.textoCustom);
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🟩 Zustand Demo</h1>
      <p className="mb-4">El contador está en Zustand store.</p>
      <div className="bg-yellow-100 p-2 rounded mb-2">
        <strong>Renders: {renderCount.current}</strong>
      </div>
      <input type="text" value={textoCustom} onChange={(e) => setTextoCustom(e.target.value)} />
      <button
        className="px-3 py-1 mb-2 bg-green-600 text-white rounded"
        onClick={launchAlert}
      >
        Lanzar alerta
      </button>
      <div style={{ border: "1px solid white", padding: 10 }}>
        <DeepChildZustand />
      </div>
    </div>
  );
}
