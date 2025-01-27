import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ResponsiveAppBar from './components/Navbar'
import Footer from './components/Footer'
import ExampleHandsontable from './pages/createTikckets'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ResponsiveAppBar />
    <ExampleHandsontable/>
    <Footer />
    </>
  )
}

export default App
