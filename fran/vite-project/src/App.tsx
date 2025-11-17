import './App.css'
import { Board } from './components/Board'

function App() {
  return (
    <>
      <Board onAddCard={() => console.log('Agregar card')} />
    </>
  )
}

export default App
