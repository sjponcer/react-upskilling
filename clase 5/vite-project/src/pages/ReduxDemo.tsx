import { useRef } from "react";
import DeepChildRedux from "../components/DeepChildRedux";
import { useCounterActions } from "../state/redux/hooks";

export default function ReduxDemo() {
  // Use custom hook that doesn't subscribe to state changes
  const { launchAlert } = useCounterActions();
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🟥 Redux Toolkit Demo</h1>
      <p className="mb-4">El contador está en Redux store.</p>
      <div className="bg-yellow-100 p-2 rounded mb-2">
        <strong>Renders: {renderCount.current}</strong>
      </div>
      <button
        className="px-3 py-1 mb-2 bg-red-600 text-white rounded"
        onClick={launchAlert}
      >
        Lanzar alerta
      </button>
      <div style={{ border: "1px solid white", padding: 10 }}>
        <DeepChildRedux />
      </div>
    </div>
  );
}
