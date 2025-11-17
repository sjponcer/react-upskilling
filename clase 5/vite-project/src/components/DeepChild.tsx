import { useRef } from "react";

interface DeepChildProps {
  count: number;
  setCount: (count: number) => void;
}

export default function DeepChild({ count, setCount }: DeepChildProps) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="border p-4 rounded bg-gray-100">
      <h2 className="text-lg mb-2">Componente profundo</h2>
      <div className="bg-yellow-100 p-2 rounded mb-2">
        <strong>Renders: {renderCount.current}</strong>
      </div>

      <div style={{ border: "1px solid white", padding: 10 }}>

        <DeepGrandChild count={count} setCount={setCount} />
      </div>
    </div>
  );
}


export function DeepGrandChild({ count, setCount }: DeepChildProps) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="border p-4 rounded bg-gray-100">
      <h2 className="text-lg mb-2">Componente muy profundo</h2>
      <div className="bg-yellow-100 p-2 rounded mb-2">
        <strong>Renders: {renderCount.current}</strong>
      </div>
      <div style={{ border: "1px solid white", padding: 10 }}>

        <DeepGreatGrandChild count={count} setCount={setCount} />
      </div>
    </div>
  );
}


export function DeepGreatGrandChild({ count, setCount }: DeepChildProps) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="border p-4 rounded bg-gray-100">
      <h2 className="text-lg mb-2">Componente muy muy profundo</h2>
      <div className="bg-yellow-100 p-2 rounded mb-2">
        <strong>Renders: {renderCount.current}</strong>
      </div>

      <p className="text-md">Count: {count}</p>

      <button
        className="px-3 py-1 mt-2 bg-blue-500 text-white rounded"
        onClick={() => setCount(count + 1)}
      >
        Incrementar
      </button>
    </div>
  );
}

