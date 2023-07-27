import './App.css'
import Home from "./pages/Home/Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddGroup from './pages/addGroup/AddGroup'
import Nav from './components/nav/Nav'
import Task from './pages/task/Task';

function App() {

  return (
    <div className='mt-10 px-10'>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='/create_group' element={<AddGroup />} />
            <Route path='/task' element={<Task />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


