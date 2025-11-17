import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface RenderCountContextType {
  globalRenderCount: number;
  incrementRenderCount: () => void;
  resetRenderCount: () => void;
}

const RenderCountContext = createContext<RenderCountContextType | undefined>(
  undefined
);

export function RenderCountProvider({ children }: { children: ReactNode }) {
  const [globalRenderCount, setGlobalRenderCount] = useState(0);
  const location = useLocation();

  // Reiniciar el contador cuando cambia la ruta (demo)
  useEffect(() => {
    setGlobalRenderCount(0);
  }, [location.pathname]);

  const incrementRenderCount = () => {
    setGlobalRenderCount((prev) => prev + 1);
  };

  const resetRenderCount = () => {
    setGlobalRenderCount(0);
  };

  return (
    <RenderCountContext.Provider
      value={{ globalRenderCount, incrementRenderCount, resetRenderCount }}
    >
      {children}
    </RenderCountContext.Provider>
  );
}

export function useGlobalRenderCount() {
  const context = useContext(RenderCountContext);
  if (!context) {
    throw new Error(
      "useGlobalRenderCount must be used within RenderCountProvider"
    );
  }
  return context;
}

