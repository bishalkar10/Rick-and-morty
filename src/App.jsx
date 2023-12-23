// implement routing with react-router-dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Characters from './pages/Characters';
import CharacterProfile from './pages/CharacterProfile';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/character" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterProfile />} />
      </Routes>
    </Router>
  )
}

export default App
