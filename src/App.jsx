import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// toast
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import Home from './pages/Home';
import Login from './pages/Login';
import Nav from './components/Nav';
import Dashboard from './components/AddUserData';
import Users from './pages/Users';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UsersHistory from './components/UsersHistory';
import UsersRequests from './components/UsersRequests';
import RegisterDetails from './components/RegisterDetails';
import MeetingType from './components/MeetingType';
import MeetingMode from './components/MeetingMode';
import DepartmentDetails from './components/DepartmentDetails';
import DesignationDetails from './components/DesignationDetails';
import OfficeDetails from './components/OfficeDetails';
import CompanyDetails from './components/CompanyDetails';
import ConferenceRoom from './components/ConferenceRoom';
import Roles from './components/Roles';
import AllAdmin from './components/AllAdmin';
import AddAdmin from './components/AddAdmin';
import UpdateAdmin from './components/UpdateAdmin';
import VisitorReg from './components/VisitorReg';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Use PrivateRoute for all protected routes */}
        <Route
          path="/"
          element={<Navigate to="/admin/details/roles" />} name={"role"} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/users/history" element={<Nav element={<UsersHistory/>}/> }/>
        <Route path="/admin/users/requests" element={<Nav element={<UsersRequests/>}/> }/>
        <Route path="/admin/users/reg_details" element={<Nav element={<RegisterDetails/>}/> }/>
        <Route path="/admin/details/meeting_Type" element={<Nav element={<MeetingType/>}/> }/>
        <Route path="/admin/details/meeting_Mode" element={<Nav element={<MeetingMode/>}/> }/>
        <Route path="/admin/details/department" element={<Nav element={<DepartmentDetails/>}/> }/>
        <Route path="/admin/details/designation" element={<Nav element={<DesignationDetails/>}/> }/>
        <Route path="/admin/details/office" element={<Nav element={<OfficeDetails/> }/> }/>
        <Route path="/admin/details/company" element={<Nav element={<CompanyDetails/>}/> }/>
        <Route path="/admin/details/conference" element={<Nav element={<ConferenceRoom/>}/> }/>
        <Route path="/admin/details/roles" element={<Nav element={<Roles/>}/> }/>
        <Route path="/admin/all_Admin" element={<Nav element={<AllAdmin/>}/> }/>
        <Route path="/admin/add_Admin" element={<Nav element={<AddAdmin/>}/> }/>
        <Route path="/admin/update_Admin" element={<Nav element={<UpdateAdmin/>}/> }/>
        <Route path="/visitor/visitor_Registration" element={<VisitorReg/>}/>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  )
}

export default App
