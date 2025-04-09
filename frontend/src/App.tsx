import './App.css'
// import DashboardNavbar from './Pages/Dashboard/DashboardNavbar'
// import Sidebar from './Pages/Dashboard/Sidebar'
import Contact from './Pages/LandingPage/Contact'
import Faqs from './Pages/LandingPage/Faqs'
import Feature from './Pages/LandingPage/Feature'
import Footer from './Pages/LandingPage/Footer'
import Hero from './Pages/LandingPage/Hero'
import Navbar from './Pages/LandingPage/Navbar'
// import Step1 from './Pages/Profile Forms/Step1'
// import Step2 from './Pages/Profile Forms/Step2'
// import Step3 from './Pages/Profile Forms/Step3'
// import Step4 from './Pages/Profile Forms/Step4'
// import Step5 from './Pages/Profile Forms/Step5'
// import LogIn from './Pages/Log In/LogIn'
// import SignIn from './Pages/Sign In/SignIn'

function App() {

  return (
    <>
   <Navbar />
    <Hero />
    <Feature />
    <Contact />
    <Faqs />
    <Footer />
  
    {/* <SignIn /> */}
    {/* <LogIn /> */}
    {/* <Step1 />
    <Step2 />
     <Step3 />
    <Step4 />
    <Step5 /> */}


    {/* <div className=' w-screen h-screen flex flex-row'>
    <Sidebar />
    <div className=' flex-1 flex-col'>
    <DashboardNavbar />
    </div>
    </div> */}
    </>
  )
}

export default App
