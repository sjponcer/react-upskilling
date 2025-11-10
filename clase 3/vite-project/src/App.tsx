import { Routes, Route } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore";
import Home from "./pages/Home.tsx";
import Posts from "./pages/Posts.tsx";
import ReactQueryDemo from "./pages/ReactQueryDemo.tsx";
import Contact from "./pages/Contact.tsx";
import NavBar from "./components/Navbar.tsx";

export default function App() {
  const { dark } = useThemeStore() as { dark: boolean };

  return (
    <div className={dark ? "bg-slate-900 text-white min-h-screen" : "bg-white text-slate-900 min-h-screen"}>
      <NavBar />

      <main className="p-6 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/react-query-demo" element={<ReactQueryDemo />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}
