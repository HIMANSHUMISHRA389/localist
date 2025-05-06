import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home.jsx'
import LocationSelection from './pages/LocationSelection.jsx'
import RegistrationForm from './pages/RegistrationForm.jsx'
import BusinessAddressForm from './pages/BusinessAddressForm.jsx'
import AdditionalServicesForm from './pages/AdditionalServicesForm.jsx'
// import Login from './pages/Login'
// import Professional from './pages/Professional'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import './styles/global.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/location-selection" element={<LocationSelection />} />
            <Route path="/registration-form" element={<RegistrationForm />} />
            <Route path="/business-address" element={<BusinessAddressForm />} />
            <Route path="/additional-services" element={<AdditionalServicesForm />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/join-as-professional" element={<Professional />} /> */}
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-center" />
      </div>
    </Router>
  )
}

export default App
