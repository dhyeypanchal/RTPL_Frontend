import '../css/addUserDrawer.css'
import { useState } from 'react';
import { MdAddChart } from "react-icons/md";
import { toast } from 'react-toastify';
import instance from '../utils/axios';

const meetingInitialValues = {
  MeetingType: ""
};

const meetingmodeInitialValues = {
  MeetingMode: ""
};


const companyInitialValues = {
  Name:"",
  Contact:"",
  Email:""
};

const departmentInitialValues = {
  Department: ""
};

const designationInitialValues = {
  Designation: "",
  DepartmentID:""
};

const officeInitialValues = {
  CompanyId: "",
  Address:""
};

const conferenceInitialValues = {
  OfficeId: "",
  ConferenceRoomName:""
};


const roleInitialValues = {
  id:"",
  Role:""
}


// eslint-disable-next-line react/prop-types
function AddUserData({ isOpen, onClose, onAddData, meetingtype, meetingmode, company, department, designation, office, conference, role }) {

  // for the meeting type
  const [newMeetingType, setNewMeetingType] = useState(meetingInitialValues);

  const handleMeetingInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeetingType((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewUserData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleAddDataForMeeting = async (e) => {
    const token = localStorage.getItem("token")
    e.preventDefault();
    try {
      const res = await instance.post('/api/meetingtype/add_meetingType',
        {
          meetingType: newMeetingType.MeetingType,
          isActive: true
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res.data);
      // const req = {
      //   status: 201
      // }
      // if (req.status === 201) {
      // window.location.reload()
      onAddData(newMeetingType);
      setNewMeetingType(meetingInitialValues);

      onClose();
      toast.success("Meeting Type data added successfully");
      // }
    } catch (error) {
      toast.error("this can not execute for now");
    }
  };



  // for the meeting mode
  const [newMeetingMode, setNewMeetingMode] = useState(meetingmodeInitialValues);

  const handleMeetingModeInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeetingMode((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleAddDataForMeetingMode = async (e) => {
    console.log(newMeetingMode.MeetingMode);
    const token = localStorage.getItem("token")
    e.preventDefault();
    try {
      const res = await instance.post('/api/meetingmode/add_meetingMode',
        {
          meetingMode: newMeetingMode.MeetingMode,
          isActive: true
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      // const req = {
      //   status: 201
      // }
      // if (req.status === 201) {
      // window.location.reload()
      onAddData(newMeetingMode);
      setNewMeetingType(meetingmodeInitialValues);

      onClose();
      toast.success("Meeting Type data added successfully");
      // }
    } catch (error) {
      toast.error("this can not execute for now");
    }
  };



  // for company details

  const [newCompany, setNewCompanyData] = useState(companyInitialValues);

  const handleCompanyDataInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleAddDataForCompany = async (e) => {
    console.log(newCompany.CompanyName);
    const token = localStorage.getItem("token")
    e.preventDefault();
    try {
      const res = await instance.post('/api/company/addCompany',
        {
          Name: newCompany.CompanyName,
          contact: newCompany.Contact,
          email: newCompany.Email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      // const req = {
      //   status: 201
      // }
      // if (req.status === 201) {
      // window.location.reload()
      onAddData(newCompany);
      setNewMeetingType(companyInitialValues);

      onClose();
      toast.success("Meeting Type data added successfully");
      // }
    } catch (error) {
      toast.error("this can not execute for now");
    }
  };



  // for department details
  const [newDepartment, setNewDepartmentData] = useState(departmentInitialValues);

  const handleDepartmentInputChange = (e) => {
    const { name, value } = e.target;
    setNewDepartmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleAddDataForDepartment = async (e) => {
    console.log(newDepartment.Department);
    const token = localStorage.getItem("token")
    e.preventDefault();
    try {
      const res = await instance.post('/api/department/add_department',
        {
          department: newDepartment.Department,
          isActive: true
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      // const req = {
      //   status: 201
      // }
      // if (req.status === 201) {
      // window.location.reload()
      onAddData(newDepartment);
      setNewMeetingType(departmentInitialValues);

      onClose();
      toast.success("Meeting Type data added successfully");
      // }
    } catch (error) {
      toast.error("this can not execute for now");
    }
  };




  // for designation details
  const [newDesignation, setNewDesignationData] = useState(designationInitialValues);

  const handleDesignationInputChange = (e) => {
    const { name, value } = e.target;
    setNewDesignationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleAddDataForDesignation = async (e) => {
    console.log(newDesignation.Designation);
    const token = localStorage.getItem("token")
    e.preventDefault();
    try {
      const res = await instance.post('/api/designation/add_designation',
        {
          designation: newDesignation.Designation,
          departmentID: newDesignation.DepartmentID
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      // const req = {
      //   status: 201
      // }
      // if (req.status === 201) {
      // window.location.reload()
      onAddData(newDesignation);
      setNewMeetingType(designationInitialValues);

      onClose();
      toast.success("Meeting Type data added successfully");
      // }
    } catch (error) {
      toast.error("this can not execute for now");
    }
  };




  // for office details

  const [newOffice, setNewOfficeData] = useState(officeInitialValues);

  const handleOfficeInputChange = (e) => {
    const { name, value } = e.target;
    setNewOfficeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleAddDataForOffice = async (e) => {
    console.log(newOffice.CompanyId);
    console.log(newOffice.Address);
    const token = localStorage.getItem("token")
    e.preventDefault();
    try {
      const res = await instance.post('/api/company/office/addOffice',
        {
          companyID: newOffice.CompanyId,
          Address: newOffice.Address
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      // const req = {
      //   status: 201
      // }
      // if (req.status === 201) {
      // window.location.reload()
      onAddData(newOffice);
      setNewMeetingType(officeInitialValues);

      onClose();
      toast.success("Meeting Type data added successfully");
      // }
    } catch (error) {
      toast.error("this can not execute for now");
    }
  };




  // for Conference details

  const [newConference, setNewConferenceData] = useState(conferenceInitialValues);

  const handleConferenceInputChange = (e) => {
    const { name, value } = e.target;
    setNewConferenceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleAddDataForConference = async (e) => {
    console.log(newConference.OfficeId);
    const token = localStorage.getItem("token")
    e.preventDefault();
    try {
      const res = await instance.post('/api/conferenceRoom/addConferenceRoom',
        {
          officeID: newConference.OfficeId,
          conferenceRoomName: newConference.ConferenceRoomName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      // const req = {
      //   status: 201
      // }
      // if (req.status === 201) {
      // window.location.reload()
      onAddData(newConference);
      setNewMeetingType(conferenceInitialValues);

      onClose();
      toast.success("Meeting Type data added successfully");
      // }
    } catch (error) {
      toast.error("this can not execute for now");
    }
  };



  // for the roles

  const [newRole, setNewRole] = useState(roleInitialValues);

  const handleRoleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleAddDataForRole = async (e) => {
    console.log(newRole.Role);
    const token = localStorage.getItem("token")
    e.preventDefault();
    try {
      const res = await instance.post('/api/role/addRole',
        {
          role: newRole.Role
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      // const req = {
      //   status: 201
      // }
      // if (req.status === 201) {
      // window.location.reload()
      onAddData(newRole);
      setNewMeetingType(roleInitialValues);

      onClose();
      toast.success("Meeting Type data added successfully");
      // }
    } catch (error) {
      toast.error("this can not execute for now");
    }
  };


  return (
    <>

      {/* <div className={`add-user-drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-content">
        <h3 style={{ textAlign: "center" }}><MdAddChart style={{ fontSize: "35px",display:"inline-block" }} />Add New Data</h3>
        <form onSubmit={handleAddData}>
          <label>Name</label>
          <input
            type="text"
            className='form-control'
            name="Name"
            placeholder='Enter Your name'
            value={newUserData.Name}
            onChange={handleInputChange}
            autoComplete='off'
          />
          <label>Email</label>
          <input
            type="email"
            className='form-control'
            name="Email"
            placeholder='Enter Your Email'
            value={newUserData.Email}
            onChange={handleInputChange}
            autoComplete='off'
          />
          <label>Mobile No.</label>
          <input
            type="number"
            className='form-control'
            name="MobileNo"
            placeholder='Enter Your Mobile No.'
            value={newUserData.MobileNo}
            onChange={handleInputChange}
            autoComplete='off'
          />
          <label>Approve / Not Approve</label>
          <input
            type="text"
            className='form-control'
            name="City"
            placeholder='Enter Your City / Village'
            value={newUserData.City}
            onChange={handleInputChange}
            autoComplete='off'
          />

          <div className='formBtn'>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Add Data</button>
          </div>
        </form>
      </div>
    </div> */}
      {meetingtype &&
        <div className={`add-user-drawer ${isOpen ? 'open' : ''}`}>
          <div className="drawer-content">
            <h3 style={{ textAlign: "center" }}><MdAddChart style={{ fontSize: "35px", display: "inline-block" }} />Add New Data</h3>
            <form onSubmit={handleAddDataForMeeting}>
              <label className='text-left'>Meeting Type</label>
              <input
                type="text"
                className='form-control'
                name="MeetingType"
                placeholder='Enter Meeting Type'
                value={newMeetingType.MeetingType}
                onChange={handleMeetingInputChange}
                autoComplete='off'
              />

              <div className='formBtn'>
                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit">Add Data</button>
              </div>
            </form>
          </div>
        </div>
      }

      {meetingmode &&
        <div className={`add-user-drawer ${isOpen ? 'open' : ''}`}>
          <div className="drawer-content">
            <h3 style={{ textAlign: "center" }}><MdAddChart style={{ fontSize: "35px", display: "inline-block" }} />Add New Data</h3>
            <form onSubmit={handleAddDataForMeetingMode}>
              <label className='text-left'>Meeting Mode</label>
              <input
                type="text"
                className='form-control'
                name="MeetingMode"
                placeholder='Enter Meeting Mode'
                value={newMeetingMode.MeetingMode}
                onChange={handleMeetingModeInputChange}
                autoComplete='off'
              />

              <div className='formBtn'>
                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit">Add Data</button>
              </div>
            </form>
          </div>
        </div>
      }



      {company &&
        <div className={`add-user-drawer ${isOpen ? 'open' : ''}`}>
          <div className="drawer-content">
            <h3 style={{ textAlign: "center" }}><MdAddChart style={{ fontSize: "35px", display: "inline-block" }} />Add New Data</h3>
            <form onSubmit={handleAddDataForCompany}>
              <label className='text-left'>Company Name</label>
              <input
                type="text"
                className='form-control'
                name="CompanyName"
                placeholder='Enter Company Name'
                value={newCompany.CompanyName}
                onChange={handleCompanyDataInputChange}
                autoComplete='off'
              />
              <label className='text-left'>Company Contact</label>
              <input
                type="number"
                className='form-control'
                name="Contact"
                placeholder='Enter Company Contact'
                value={newCompany.Contact}
                onChange={handleCompanyDataInputChange}
                autoComplete='off'
              />
              <label className='text-left'>Company Email</label>
              <input
                type="email"
                className='form-control'
                name="Email"
                placeholder='Enter Company Email'
                value={newCompany.Email}
                onChange={handleCompanyDataInputChange}
                autoComplete='off'
              />

              <div className='formBtn'>
                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit">Add Data</button>
              </div>
            </form>
          </div>
        </div>
      }


      {department &&
        <div className={`add-user-drawer ${isOpen ? 'open' : ''}`}>
          <div className="drawer-content">
            <h3 style={{ textAlign: "center" }}><MdAddChart style={{ fontSize: "35px", display: "inline-block" }} />Add New Data</h3>
            <form onSubmit={handleAddDataForDepartment}>
              <label className='text-left'>Department</label>
              <input
                type="text"
                className='form-control'
                name="Department"
                placeholder='Enter Department'
                value={newDepartment.Department}
                onChange={handleDepartmentInputChange}
                autoComplete='off'
              />

              <div className='formBtn'>
                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit">Add Data</button>
              </div>
            </form>
          </div>
        </div>
      }


      {designation &&
        <div className={`add-user-drawer ${isOpen ? 'open' : ''}`}>
          <div className="drawer-content">
            <h3 style={{ textAlign: "center" }}><MdAddChart style={{ fontSize: "35px", display: "inline-block" }} />Add New Data</h3>
            <form onSubmit={handleAddDataForDesignation}>
              <label className='text-left'>Designation</label>
              <input
                type="text"
                className='form-control'
                name="Designation"
                placeholder='Enter Designation'
                value={newDesignation.Designation}
                onChange={handleDesignationInputChange}
                autoComplete='off'
              />

              <label className='text-left'>Department Id</label>
              <input
                type="number"
                className='form-control'
                name="DepartmentID"
                placeholder='Enter Department Id'
                value={newDesignation.DepartmentID}
                onChange={handleDesignationInputChange}
                autoComplete='off'
              />

              <div className='formBtn'>
                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit">Add Data</button>
              </div>
            </form>
          </div>
        </div>
      }


      {office &&
        <div className={`add-user-drawer ${isOpen ? 'open' : ''}`}>
          <div className="drawer-content">
            <h3 style={{ textAlign: "center" }}><MdAddChart style={{ fontSize: "35px", display: "inline-block" }} />Add New Data</h3>
            <form onSubmit={handleAddDataForOffice}>
              <label className='text-left'>Company Id</label>
              <input
                type="number"
                className='form-control'
                name="CompanyId"
                placeholder='Enter Company Id'
                value={newOffice.CompanyId}
                onChange={handleOfficeInputChange}
                autoComplete='off'
              />

              <label className='text-left'>Address</label>
              <input
                type="text"
                className='form-control'
                name="Address"
                placeholder='Enter Address'
                value={newOffice.Address}
                onChange={handleOfficeInputChange}
                autoComplete='off'
              />

              <div className='formBtn'>
                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit">Add Data</button>
              </div>
            </form>
          </div>
        </div>
      }


      {conference &&
        <div className={`add-user-drawer ${isOpen ? 'open' : ''}`}>
          <div className="drawer-content">
            <h3 style={{ textAlign: "center" }}><MdAddChart style={{ fontSize: "35px", display: "inline-block" }} />Add New Data</h3>
            <form onSubmit={handleAddDataForConference}>
              <label className='text-left'>Office Id</label>
              <input
                type="number"
                className='form-control'
                name="OfficeId"
                placeholder='Enter Company Id'
                value={newConference.OfficeId}
                onChange={handleConferenceInputChange}
                autoComplete='off'
              />

              <label className='text-left'>Conference Room Name</label>
              <input
                type="text"
                className='form-control'
                name="ConferenceRoomName"
                placeholder='Enter Conference Room Name'
                value={newConference.ConferenceRoomName}
                onChange={handleConferenceInputChange}
                autoComplete='off'
              />

              <div className='formBtn'>
                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit">Add Data</button>
              </div>
            </form>
          </div>
        </div>
      }




      {role &&
        <div className={`add-user-drawer ${isOpen ? 'open' : ''}`}>
          <div className="drawer-content">
            <h3 style={{ textAlign: "center" }}><MdAddChart style={{ fontSize: "35px", display: "inline-block" }} />Add New Data</h3>
            <form onSubmit={handleAddDataForRole}>
              <label className='text-left'>Role</label>
              <input
                type="text"
                className='form-control'
                name="Role"
                placeholder='Enter Role'
                value={newRole.Role}
                onChange={handleRoleInputChange}
                autoComplete='off'
              />

              <div className='formBtn'>
                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit">Add Data</button>
              </div>
            </form>
          </div>
        </div>
      }



    </>
  )
}

export default AddUserData
