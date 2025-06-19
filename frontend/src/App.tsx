import './App.css'
import { Route, Routes } from "react-router-dom";
import LandingLayout from './Pages/LandingPage/LandingLayout';
import MultiStepForm from './Pages/Profile Forms/MultiStepForm';
import DashboardLayout from './Pages/Dashboard/DashboardLayout';
import Analytics from './Pages/Dashboard/Analytics';
import DailyTask from './Pages/Dashboard/DailyTask';
import DashboardHome from './Pages/Dashboard/DashBoardHome';
import Profile from './Pages/Dashboard/Profile';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingLayout />} />
      <Route path='/form' element={<MultiStepForm />} />
      <Route path='/dashboard' element={<DashboardLayout />}>
      <Route index element={<DashboardHome />} />
      <Route  path='dashboard-home' element={<DashboardHome />} />
      <Route path='analytics' element={<Analytics />} />
      <Route path='daily-task' element={<DailyTask />} />
      <Route path='profile' element={<Profile />} />
      </Route>


    </Routes>

    
    </>
  )
}

export default App
