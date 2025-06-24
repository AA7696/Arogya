import './App.css'
import { Route, Routes } from "react-router-dom";
import LandingLayout from './Pages/LandingPage/LandingLayout';
import MultiStepForm from './Pages/Profile Forms/MultiStepForm';
import DashboardLayout from './Pages/Dashboard/DashboardLayout';
import Analytics from './Pages/Dashboard/Analytics';
import DailyTask from './Pages/Dashboard/DailyTask';
import DashboardHome from './Pages/Dashboard/DashBoardHome';
import Profile from './Pages/Dashboard/Profile';
import Appointment from './Pages/Dashboard/Appointment';
import DoctorDetail from './Pages/Dashboard/DoctorDetails';
import AiChat from './Pages/Dashboard/AiChat';
import AiReport from './Pages/Dashboard/AiReport';
import ManageAccount from './Pages/ManageAccount/ManageAccount';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingLayout />} />
      <Route path='/profile' element={<ManageAccount />} />
      <Route path='/form' element={<MultiStepForm />} />
      <Route path='/dashboard' element={<DashboardLayout />}>
      <Route index element={<DashboardHome />} />
      <Route  path='dashboard-home' element={<DashboardHome />} />
      <Route path='analytics' element={<Analytics />} />
      <Route path='daily-task' element={<DailyTask />} />
      <Route path='appointment' element={<Appointment />} />
      <Route path='doctors/:id' element={<DoctorDetail />} />
      <Route path='aichat' element={<AiChat />} />
      <Route path='aireport' element={<AiReport />} />
      <Route path='profile' element={<Profile />} />
      </Route>


    </Routes>

    
    </>
  )
}

export default App
