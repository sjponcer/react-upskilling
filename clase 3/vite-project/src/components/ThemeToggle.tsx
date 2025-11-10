import { useThemeStore } from "../store/useThemeStore";

export function ThemeToggle() {
  const theme = useThemeStore() as { dark: boolean; toggle: () => void };
  const { dark, toggle } = theme;

  return (
    <button
      onClick={toggle}
      className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
