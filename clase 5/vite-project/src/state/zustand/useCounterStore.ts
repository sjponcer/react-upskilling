import { create } from "zustand";

interface CounterStore {
  count: number;
  textoCustom: string;
  setTextoCustom: (texto: string) => void;
  increment: () => void;
  setCount: (count: number) => void;
  launchAlert: () => void;
}

interface TextoStore {
  textoCustom: string;
  setTextoCustom: (texto: string) => void;
}

export const useCounterStore = create<CounterStore>((set, get) => ({
  count: 0,
  textoCustom: "Hola Mundo",
  setTextoCustom: (texto: string) => set({ textoCustom: texto }),
  increment: () => set((s) => ({ count: s.count + 1 })),
  setCount: (count: number) => set({ count }),
  launchAlert: () => alert(`Count: ${get().count}`),
}));

export const useTextStore = create<TextoStore>((set) => ({
  textoCustom: "Hola Mundo",
  setTextoCustom: (texto: string) => set({ textoCustom: texto }),
}));
