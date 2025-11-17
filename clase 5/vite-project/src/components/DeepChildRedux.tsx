import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../state/redux/store";
import { setValue } from "../state/redux/counterSlice";

export default function DeepChildRedux() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="border p-4 rounded bg-gray-100">
      <h2 className="text-lg mb-2">Componente profundo</h2>
      <div className="bg-yellow-100 p-2 rounded mb-2">
        <strong>Renders: {renderCount.current}</strong>
      </div>

      <div style={{ border: "1px solid white", padding: 10 }}>
        <DeepGrandChildRedux />
      </div>
    </div>
  );
}


export function DeepGrandChildRedux() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="border p-4 rounded bg-gray-100">
      <h2 className="text-lg mb-2">Componente muy profundo</h2>
      <div className="bg-yellow-100 p-2 rounded mb-2">
        <strong>Renders: {renderCount.current}</strong>
      </div>
      <div style={{ border: "1px solid white", padding: 10 }}>
        <DeepGreatGrandChildRedux />
      </div>
    </div>
  );
}


export function DeepGreatGrandChildRedux() {
  const renderCount = useRef(0);
  renderCount.current += 1;
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="border p-4 rounded bg-gray-100">
      <h2 className="text-lg mb-2">Componente muy muy profundo</h2>
      <div className="bg-yellow-100 p-2 rounded mb-2">
        <strong>Renders: {renderCount.current}</strong>
      </div>

      <p className="text-md">Count: {count}</p>

      <button
        className="px-3 py-1 mt-2 bg-red-600 text-white rounded"
        onClick={() => dispatch(setValue(count + 1))}
      >
        Incrementar
      </button>
    </div>
  );
}

