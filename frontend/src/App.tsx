import './App.css'
import { Route, Routes } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';
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
import Step5 from './Pages/Profile Forms/Step5';
import { Toaster } from "react-hot-toast";

function App() {
  const {user} = useUser();

  return (
    <>
     <Toaster position="top-right" reverseOrder={false} />
    <Routes>
      <Route path='/' element={<LandingLayout />} />
      {user && (
        <>
      <Route path='/profile' element={<ManageAccount />} />
      <Route path='/form' element={<MultiStepForm />} />
      <Route path='/form-complete' element={<Step5 />} />
      <Route path='/dashboard' element={<DashboardLayout />}>
      <Route index element={<DashboardHome />} />
      <Route path='dashboard-home' element={<DashboardHome />} />
      <Route path='analytics' element={<Analytics />} />
      <Route path='daily-task' element={<DailyTask />} />
      <Route path='appointment' element={<Appointment />} />
      <Route path='doctors/:id' element={<DoctorDetail />} />
      <Route path='aichat' element={<AiChat />} />
      <Route path='aireport' element={<AiReport />} />
      <Route path='profile' element={<Profile />} />
      </Route>
      </>

      )}
      <Route path="*" element={<div style={{ textAlign: 'center', marginTop: '2rem' }}><h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p></div>} />
     
    </Routes>

    
    </>
  )
}

export default App
