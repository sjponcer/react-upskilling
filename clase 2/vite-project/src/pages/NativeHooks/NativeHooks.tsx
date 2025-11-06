import Effects from "./components/Effects"
import Optimization from "./components/optimization"

export default function NativeHooks() {
  return (<>
    <div className="w-full max-w-4xl">
      <Effects />
    </div>
    <div className="w-full max-w-4xl">
      <Optimization />
    </div>
  </>
  )
}

