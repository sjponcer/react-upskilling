import { useEffect, useState } from "react";

export default function UseEffectCountersDemo() {
  const [count, setCount] = useState(0);
  const [noDepsCount, setNoDepsCount] = useState(0);
  const [emptyDepsCount, setEmptyDepsCount] = useState(0);
  const [depCount, setDepCount] = useState(0);

  // 🌀 Caso 1: Sin array de dependencias → en cada render
  /* useEffect(() => {
    setNoDepsCount((prev) => prev + 1);
  }); */

  // 🧩 Caso 2: Array vacío → solo al montar
 /*  useEffect(() => {
    setEmptyDepsCount((prev) => prev + 1);
  }, []); */

  // 🎚️ Caso 3: Con dependencias → cuando cambia count
 /*  useEffect(() => {
    setDepCount((prev) => prev + 1);
  }, [count]); */

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-8">
        ⚛️ useEffect — Comparando dependencias
      </h1>

      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition"
        >
          Incrementar count
        </button>
        <span className="text-lg">
          Count: <span className="font-mono text-sky-400">{count}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {/* Caso 1 */}
        <div className="bg-slate-800 rounded-xl p-6 text-center shadow-lg border border-slate-700">
          <h2 className="text-lg font-semibold mb-2">🌀 Sin dependencias</h2>
          <p className="text-5xl font-mono text-indigo-400">{noDepsCount}</p>
          <p className="text-gray-400 mt-2">Ejecutado en cada render</p>
        </div>

        {/* Caso 2 */}
        <div className="bg-slate-800 rounded-xl p-6 text-center shadow-lg border border-slate-700">
          <h2 className="text-lg font-semibold mb-2">🧩 Array vacío []</h2>
          <p className="text-5xl font-mono text-green-400">{emptyDepsCount}</p>
          <p className="text-gray-400 mt-2">Solo al montar</p>
        </div>

        {/* Caso 3 */}
        <div className="bg-slate-800 rounded-xl p-6 text-center shadow-lg border border-slate-700">
          <h2 className="text-lg font-semibold mb-2">🎚️ Dependencia [count]</h2>
          <p className="text-5xl font-mono text-amber-400">{depCount}</p>
          <p className="text-gray-400 mt-2">
            Solo cuando cambia <code>count</code>
          </p>
        </div>
      </div>

      <div className="mt-10 text-gray-400 text-sm text-center max-w-xl">
        <p>
          🔁 <strong>Sin array</strong>: cada render
        </p>
        <p>
          🎯 <strong>[] vacío</strong>: una sola vez
        </p>
        <p>
          ⚙️ <strong>[dep]</strong>: cuando cambia la dependencia
        </p>
      </div>
    </div>
  );
}
