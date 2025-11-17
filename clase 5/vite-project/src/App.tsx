import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PropDrillingDemo from "./pages/PropDrillingDemo";
import ContextDemo from "./pages/ContextDemo";
import ZustandDemo from "./pages/ZustandDemo";
import ReduxDemo from "./pages/ReduxDemo";
import { Provider } from "react-redux";
import { store } from "./state/redux/store";
import { CounterProvider } from "./state/context/CounterContext";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 flex gap-4 bg-gray-900 text-white">
        <Link to="/">Prop Drilling</Link>
        <Link to="/context">Context API</Link>
        <Link to="/zustand">Zustand</Link>
        <Link to="/redux">Redux Toolkit</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PropDrillingDemo />} />
        <Route path="/context" element={
          <CounterProvider>
            <ContextDemo />
          </CounterProvider>
        } />
        <Route path="/zustand" element={<ZustandDemo />} />
        <Route
          path="/redux"
          element={
            <Provider store={store}>
              <ReduxDemo />
            </Provider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
