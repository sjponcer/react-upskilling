import { createContext, useContext, useState, useCallback, useMemo } from "react";

const CounterContext = createContext<{ count: number, setCount: (count: number) => void, launchAlert: () => void }>({ count: 0, setCount: () => { }, launchAlert: () => { } });

export const CounterProvider = ({ children }: { children: React.ReactNode }) => {
    const [count, setCount] = useState(0);

    const launchAlert = useCallback(() => {
        alert(`Count: ${count}`);
    }, [count]);

    const value = useMemo(() => ({ count, setCount, launchAlert }), [count, launchAlert]);

    return (
        <CounterContext.Provider value={value}>
            {children}
        </CounterContext.Provider>
    );
};

export const useCounter = () => useContext(CounterContext);
