import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import CustomHooks from "@/pages/CustomHooks/CustomHooks"
import NativeHooks from "@/pages/NativeHooks/NativeHooks"

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 text-white">
        {/* Navigation Bar */}
        <nav className="bg-slate-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex space-x-8">
                <Link
                  to="/custom-hooks"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
                >
                  🏠 Custom Hooks
                </Link>
                <Link
                  to="/native-hooks"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
                >
                  💬 Native Hooks
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="p-10 flex flex-col items-center">
          <Routes>
            <Route path="/custom-hooks" element={<CustomHooks />} />
            <Route path="/native-hooks" element={<NativeHooks />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
