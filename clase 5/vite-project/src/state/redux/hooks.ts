import { useCallback } from "react";
import { store } from "./store";

/**
 * Custom hook to get counter actions that don't require subscribing to state
 */
export const useCounterActions = () => {
  const launchAlert = useCallback(() => {
    const count = store.getState().counter.value;
    alert(`Count: ${count}`);
  }, []);

  return { launchAlert };
};

