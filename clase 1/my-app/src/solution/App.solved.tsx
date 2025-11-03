import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Card } from '../Card/Card.tsx'

function App() {
  const [cards, setCards] = useState<number[]>([])
  const [count, setCount] = useState(0)
  const addCard = () => {
    setCards([...cards, count])
    setCount(count + 1)
  }
  const handleCardClicked = (cardNumber: number) => {
    setCards([...cards.slice(0, cards.indexOf(cardNumber)), ...cards.slice(cards.indexOf(cardNumber) + 1)])
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={addCard}>
          Sumar una card
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {cards.map((cardNumber, index) => (
        <Card cardClicked={(cardNumber) => handleCardClicked(cardNumber)} key={index} cardNumber={cardNumber} />
      ))}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
