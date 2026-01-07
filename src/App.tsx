import {Routes, Route} from 'react-router-dom';
import {HorarioLaboral} from './pages/HorarioLaboral';
import './App.css'

function App() {
  return (
    <>
      
      <Routes>
        <Route
          path="/"
          element={<HorarioLaboral/>}
        />
      </Routes>
      
      
    </>
  )
}

export default App
