import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-slate-700 bg-slate-800">
      <h1 className="text-lg font-semibold text-sky-400">⚛️ React Ecosystem</h1>

      <div className="flex gap-6 items-center">
        <NavLink
          to="/"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "text-sky-400" : "text-gray-300 hover:text-sky-400"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "text-sky-400" : "text-gray-300 hover:text-sky-400"
          }
        >
          Posts
        </NavLink>
        <NavLink
          to="/react-query-demo"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "text-sky-400" : "text-gray-300 hover:text-sky-400"
          }
        >
          RQ Demo
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "text-sky-400" : "text-gray-300 hover:text-sky-400"
          }
        >
          Contact
        </NavLink>
        <ThemeToggle />
      </div>
    </nav>
  );
}
