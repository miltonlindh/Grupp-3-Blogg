import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './Pages/Home';
import SinglePost from './Pages/SinglePost'
import Category from './Pages/Category';
import './App.css'

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/post/:slug" element={<SinglePost />}/>
      <Route path="/category/:name" element={<Category />}/>
    </Routes>
   </Router>
  )
}

export default App
