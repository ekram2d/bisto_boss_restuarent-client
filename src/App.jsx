import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="btn-group">
        <button className="btn btn-active">Button</button>
        <button className="btn">Button</button>
        <button className="btn">Button</button>
      </div>
    </>
  )
}

export default App
