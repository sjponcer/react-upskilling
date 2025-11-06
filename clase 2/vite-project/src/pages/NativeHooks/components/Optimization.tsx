// VisualHooksDemo.jsx
import { useState, useMemo, useCallback, useRef } from "react";

export default function Optimization() {
  const [text, setText] = useState("");
  const [renders, setRenders] = useState(0);

  // 🔢 contadores internos (useRef para no forzar re-render)
  const memoRuns = useRef(0);
  const callbackRuns = useRef(0);

  // 📌 useRef: contador mutable que NO provoca re-render al cambiar
  const refCounter = useRef(0);
  const [shownRefValue, setShownRefValue] = useState(0); // snapshot para mostrar en UI

  // ref a un input (DOM ref)
  const inputDomRef = useRef(null);

  // contador de renders (para visualizar que mutar ref no re-renderiza)
  const renderCount = useRef(0);
  renderCount.current++;

  // 🧠 useMemo: incrementa memoRuns cuando se recalcula
  const expensiveValue = useMemo(() => {
    memoRuns.current++;
    // pequeña operación costosa simulada
    let total = 0;
    for (let i = 0; i < 150_000; i++) total += i;
    return `${total} | texto: ${text || "<vacío>"}`;
  }, [text]);

  // ⚙️ useCallback: incrementa callbackRuns cuando se (re)crea
  const handleCallback = useCallback(() => {
    callbackRuns.current++;
    alert(`Callback ejecutado. Texto actual: ${text || "<vacío>"}`);
  }, [text]);

  // acciones sobre refCounter
  const incrementRef = () => {
    refCounter.current += 1;
    // nota: esto no provoca re-render
  };

  const showRef = () => {
    // forzamos una actualización visual mostrando el valor actual del ref
    setShownRefValue(refCounter.current);
  };

  const focusInput = () => {
    inputDomRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-start gap-6 p-8">
      <h1 className="text-3xl font-bold mb-2 text-sky-400">
        🎯 VisualHooks: useMemo • useCallback • useRef (completo)
      </h1>

      <p className="text-gray-400 max-w-xl text-center mb-4">
        - <strong>useMemo</strong> y <strong>useCallback</strong> muestran contadores
        de ejecuciones. <br/>
        - <strong>useRef</strong> mantiene un valor mutable que <em>no</em> provoca re-render al cambiar.
      </p>

      <div className="flex gap-3 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribí algo..."
          className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none"
          ref={inputDomRef}
        />
        <button
          onClick={() => setRenders((r) => r + 1)}
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg"
        >
          🔁 Forzar render
        </button>
        <button
          onClick={focusInput}
          className="bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg"
        >
          🎯 Focus input (DOM ref)
        </button>
        <div className="mt-3">
            <div className="text-sm text-gray-300 mb-1">Renders totales (no relacionado con ref):</div>
            <div className="text-3xl font-mono text-slate-200">{renderCount.current}</div>
            <div className="text-xs text-gray-400 mt-1">Mutar ref no incrementa este valor</div>
          </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* useMemo */}
        <div className="hook-card bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
          <h2 className="text-lg font-semibold mb-2">🧠 useMemo</h2>
          <p className="text-gray-400 text-sm mb-3">
            Memoriza valores costosos; se recalcula solo si cambian dependencias.
          </p>
          <div className="text-xs bg-slate-900 p-3 rounded font-mono text-amber-400 mb-3 break-words">
            {expensiveValue}
          </div>
          <div className="text-sm text-amber-300 font-mono">
            🔢 Recalculos: {memoRuns.current}
          </div>
        </div>

        {/* useCallback */}
        <div className="hook-card bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
          <h2 className="text-lg font-semibold mb-2">⚙️ useCallback</h2>
          <p className="text-gray-400 text-sm mb-3">
            Memoriza funciones; la referencia cambia solo si varían dependencias.
          </p>
          <button
            onClick={handleCallback}
            className="bg-green-600 hover:bg-green-500 px-3 py-2 rounded-lg text-sm mb-3"
          >
            Ejecutar callback
          </button>
          <div className="text-sm text-green-300 font-mono">
            🔢 (Re)creaciones: {callbackRuns.current}
          </div>
        </div>

        {/* useRef */}
        <div className="hook-card bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
          <h2 className="text-lg font-semibold mb-2">📌 useRef</h2>
          <p className="text-gray-400 text-sm mb-3">
            Valor mutable que <em>no</em> provoca re-render al actualizarlo.
          </p>

          <div className="flex items-center justify-center gap-3 mb-3">
            <button
              onClick={incrementRef}
              className="bg-yellow-600 hover:bg-yellow-500 px-3 py-2 rounded-lg"
            >
              ➕ Incrementar ref
            </button>
            <button
              onClick={showRef}
              className="bg-gray-600 hover:bg-gray-500 px-3 py-2 rounded-lg"
            >
              👁️ Mostrar ref
            </button>
          </div>

          <div className="mb-2">
            <span className="block text-4xl font-mono text-sky-400">
              {shownRefValue}
            </span>
            <div className="text-xs text-gray-400">Valor mostrado del ref (snapshot)</div>
          </div>

          
        </div>
      </div>

      <div className="mt-8 text-gray-400 text-sm max-w-2xl text-center">
        <p>Prueba en vivo:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Presioná <strong>Incrementar ref</strong> varias veces → el contador de ref cambia internamente (no verás re-render).</li>
          <li>Presioná <strong>Mostrar ref</strong> → se hace snapshot y se muestra en la UI (esto sí causa render).</li>
          <li>Presioná <strong>Forzar render</strong> → verás que el número de renders sube, pero el ref persiste.</li>
          <li>Presioná <strong>Focus input</strong> → demostración del DOM ref (`inputDomRef`).</li>
        </ol>
      </div>
    </div>
  );
}
