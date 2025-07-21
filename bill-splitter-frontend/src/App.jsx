import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import History from '../pages/History.jsx'
import Graph from '../pages/Graph.jsx'
import AddHome from '../pages/AddHome.jsx'
import HouseDetails from '../pages/HouseDetails.jsx'
import HomePage from '../pages/HomePage.jsx'
import AddBillPage from '../pages/AddBillPage.jsx'
import HistoryPage from '../pages/HistoryPage';



function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/add-home" element={<AddHome />} />
      
      
     
      <Route path="/add-bill/:houseName" element={<AddBillPage />} />

     
        <Route path="/graph/:houseName" element={<Graph />} />

       
        <Route path="/history/:houseName" element={<HistoryPage />} />

     
    </Routes>
  )
}

export default App
