import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Cart from './components/Cart'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
