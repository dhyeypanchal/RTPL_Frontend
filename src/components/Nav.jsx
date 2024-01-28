// there is still remaining in design issues


import { Link, useLocation } from "react-router-dom";
import logo from "../../public/assets/images/logo.png";
import { useState } from "react";
// import { useEffect, useState } from "react";

import '../css/nav.css'
import { useUserInfo } from "../context/users";


// eslint-disable-next-line react/prop-types
function Nav({ element }) {
    const { toggle,setToggle } = useUserInfo()


    // const [toggle, setToggle] = useState(false)
    const [userclick, setUserClick] = useState(false)
    const [detailsClick, setDetailsClick] = useState(false)
    const [adminClick, setAdminClick] = useState(false)
    const [visitorClick, setVisitorClick] = useState(false)

    // const [activeLink, setActiveLink] = useState(null);

    // useEffect(() => {
    //     // Update the activeLink when the location changes
    //     setActiveLink(location.pathname);
    // }, [location.pathname]);


    const location = useLocation();


    const [active, setActive] = useState(false);

    const [activeDetails, setActiveDetails] = useState(false);
    const [adminDetails, setadminDetails] = useState(false);
    const [visitorDetails, setVisitorDetails] = useState(false);



    const toggleSidebar = () => {
        setToggle(!toggle)
    }

    const UserFunc = () => {
        setUserClick(!userclick)
        setActive(!active)
    }

    const DetailsFunc = () => {
        setDetailsClick(!detailsClick)
        setActiveDetails(!activeDetails)
    }

    const AdminFunc = () => {
        setAdminClick(!adminClick)
        setadminDetails(!adminDetails)
    }


    const VisitorFunc = () => {
        setVisitorClick(!visitorClick)
        setVisitorDetails(!visitorDetails)
    }

    return (
        <>
            <div className="flex m-0 p-0">
                <div className="sidebar bg-white" style={{ Height: "100vh", width: `${!toggle ? "15%" : "0%"}`, padding: "0", position: "fixed" }}>
                    <div className="flex items-center px-1 sideupper bg-white" style={{ height: "9vh", width: "100vh", borderBottom: "1px solid #cfc6c6" }}>
                        <Link to="/">
                            <img
                                alt="logo"
                                src={logo} width="65rem"
                                className=" py-1 px-0" style={{ backgroundColor: "white" }}
                            />
                        </Link>
                        <p className={`${toggle ? "hidden" : ""} pr-2 pl-2 hide organization`}>RTPL</p>
                    </div>
                    <div className={`bg-white flex flex-col pb-5 ${toggle ? "items-center" : ""} sidenav scrollnav `} style={{ height: "91vh", minWidth: `${!toggle ? "14rem" : "0rem"}`,backgroundColor:"white" }}>
                        {/* <Link style={{ color: "black", textDecoration: "none" }} to={'/admin/dashboard'} className={`pt-3 pb-3 ${activeLink === '/admin/dashboard' && !toggle ? 'nav-link active' : 'nav-link'}`}>
                            {!toggle && <div style={{ cursor: "pointer", height: "100%", width: "100%" }} className="nav-active"><i className="fa-solid fa-table-columns mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Dashboard</div>}
                        </Link> */}
                        <button
                            style={{ color: "black", textDecoration: "none", textAlign: "left" }}
                            onClick={UserFunc}
                            className={`pt-3 pl-3 pb-3 ${active === true && !toggle ? 'nav-link active' : 'nav-link'}`}
                        >
                            {!toggle && <div style={{ cursor: "pointer", height: "100%", width: "100%" }} className="nav-active"><i className="fa-regular fa-user mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Users</div>}
                        </button>
                        {userclick && (
                            <div className={`bgdropdown ml-[-0.3rem] transition-all duration-300 ${toggle ? 'opacity-0 h-0' : 'opacity-100 h-auto'}`}>
                                <div>
                                    <div className="w-full h-[2rem]">
                                        <Link style={{ color: "black", textDecoration: "none" }} to={'/admin/users/requests'} className={` ${location.pathname === '/admin/users/requests' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}>
                                            {!toggle && <div style={{ cursor: "pointer" }} className={`pl-[3rem] pt-3 pb-3 nav-active ${location.pathname === '/admin/users/requests' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}><i className="fa-solid fa-table-columns mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Requests</div>}
                                        </Link>
                                    </div>
                                    <div className="mt-4 mb-4 h-[2rem]" style={{ width: "100%" }}>

                                        <Link style={{ color: "black", textDecoration: "none" }} to={'/admin/users/history'} className={` ${location.pathname === '/admin/users/history' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}>
                                            {!toggle && <div style={{ cursor: "pointer" }} className={`pl-[3rem] pt-3 pb-3 nav-active ${location.pathname === '/admin/users/history' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}><i className="fa-solid fa-table-columns mx-3 fa-lg" style={{ color: "#4460EF" }}></i>History</div>}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* for the details */}
                        <button
                            style={{ color: "black", textDecoration: "none", textAlign: "left" }}
                            onClick={DetailsFunc}
                            className={`pt-3 pl-3 pb-3 ${activeDetails === true && !toggle ? 'nav-link active' : 'nav-link'}`}
                        >
                            {!toggle && <div style={{ cursor: "pointer", height: "100%", width: "100%" }} className="nav-active"><i className="fa-regular fa-user mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Details</div>}
                        </button>
                        {detailsClick && (
                            <div className={`bgdropdown ml-[-0.3rem] transition-all duration-300 ${toggle ? 'opacity-0 h-0' : 'opacity-100 h-auto'}`}>
                                <div>
                                    <div className="w-full h-[2rem]">
                                        <Link style={{ color: "black", textDecoration: "none" }} to={'/admin/details/meeting_Type'} className={` ${location.pathname === '/admin/details/meeting_Type' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}>
                                            {!toggle && <div style={{ cursor: "pointer" }} className={`pl-[3rem] pt-3 pb-3 nav-active ${location.pathname === '/admin/details/meeting_Type' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}><i className="fa-solid fa-table-columns mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Meeting Type</div>}
                                        </Link>
                                    </div>
                                    <div className="mt-4 mb-3 h-[2rem]" style={{ width: "100%" }}>

                                        <Link style={{ color: "black", textDecoration: "none" }} to={'/admin/details/meeting_Mode'} className={` ${location.pathname === '/admin/details/meeting_Mode' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}>
                                            {!toggle && <div style={{ cursor: "pointer" }} className={`pl-[3rem] pt-3 pb-3 nav-active ${location.pathname === '/admin/details/meeting_Mode' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}><i className="fa-solid fa-table-columns mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Meeting Mode</div>}
                                        </Link>
                                    </div>
                                    <div className="mt-4 mb-3 h-[2rem]" style={{ width: "100%" }}>

                                        <Link style={{ color: "black", textDecoration: "none" }} to={'/admin/details/department'} className={` ${location.pathname === '/admin/details/department' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}>
                                            {!toggle && <div style={{ cursor: "pointer" }} className={`pl-[3rem] pt-3 pb-3 nav-active ${location.pathname === '/admin/details/department' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}><i className="fa-solid fa-table-columns mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Department</div>}
                                        </Link>
                                    </div>
                                    <div className="mt-4 mb-3 h-[2rem]" style={{ width: "100%" }}>

                                        <Link style={{ color: "black", textDecoration: "none" }} to={'/admin/details/designation'} className={` ${location.pathname === '/admin/details/designation' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}>
                                            {!toggle && <div style={{ cursor: "pointer" }} className={`pl-[3rem] pt-3 pb-3 nav-active ${location.pathname === '/admin/details/designation' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}><i className="fa-solid fa-table-columns mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Designation</div>}
                                        </Link>
                                    </div>
                                    <div className="mt-4 mb-3 h-[2rem]" style={{ width: "100%" }}>

                                        <Link style={{ color: "black", textDecoration: "none" }} to={'/admin/details/company'} className={` ${location.pathname === '/admin/details/company' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}>
                                            {!toggle && <div style={{ cursor: "pointer" }} className={`pl-[3rem] pt-3 pb-3 nav-active ${location.pathname === '/admin/details/company' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}><i className="fa-solid fa-table-columns mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Company</div>}
                                        </Link>
                                    </div>
                                    <div className="mt-4 mb-3 h-[2rem]" style={{ width: "100%" }}>

                                        <Link style={{ color: "black", textDecoration: "none" }} to={'/admin/details/office'} className={` ${location.pathname === '/admin/details/office' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}>
                                            {!toggle && <div style={{ cursor: "pointer" }} className={`pl-[3rem] pt-3 pb-3 nav-active ${location.pathname === '/admin/details/office' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}><i className="fa-solid fa-table-columns mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Office</div>}
                                        </Link>
                                    </div>
                                    <div className="mt-4 mb-3 h-[2rem]" style={{ width: "100%" }}>

                                        <Link style={{ color: "black", textDecoration: "none" }} to={'/admin/details/conference'} className={` ${location.pathname === '/admin/details/conference' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}>
                                            {!toggle && <div style={{ cursor: "pointer" }} className={`pl-[3rem] pt-3 pb-3 nav-active ${location.pathname === '/admin/details/conference' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}><i className="fa-solid fa-table-columns mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Conference Room</div>}
                                        </Link>
                                    </div>
                                    <div className="mt-4 mb-4 h-[2rem]" style={{ width: "100%" }}>

                                        <Link style={{ color: "black", textDecoration: "none" }} to={'/admin/details/roles'} className={` ${location.pathname === '/admin/details/roles' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}>
                                            {!toggle && <div style={{ cursor: "pointer" }} className={`pl-[3rem] pt-3 pb-3 nav-active ${location.pathname === '/admin/details/roles' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}><i className="fa-solid fa-table-columns mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Roles</div>}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}



                        {/* for the Admin */}
                        <button
                            style={{ color: "black", textDecoration: "none", textAlign: "left" }}
                            onClick={AdminFunc}
                            className={`pt-3 pl-3 pb-3 ${adminDetails === true && !toggle ? 'nav-link active' : 'nav-link'}`}
                        >
                            {!toggle && <div style={{ cursor: "pointer", height: "100%", width: "100%" }} className="nav-active"><i className="fa-regular fa-user mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Admin</div>}
                        </button>
                        {adminClick && (
                            <div className={`bgdropdown ml-[-0.3rem] transition-all duration-300 ${toggle ? 'opacity-0 h-0' : 'opacity-100 h-auto'}`}>
                                <div>
                                    <div className="w-full h-[2rem]">
                                        <Link style={{ color: "black", textDecoration: "none" }} to={'/admin/add_Admin'} className={` ${location.pathname === '/admin/add_Admin' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}>
                                            {!toggle && <div style={{ cursor: "pointer" }} className={`pl-[3rem] pt-3 pb-3 nav-active ${location.pathname === '/admin/add_Admin' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}><i className="fa-solid fa-table-columns mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Add Admin</div>}
                                        </Link>
                                    </div>
                                    <div className="mt-4 mb-3 h-[2rem]" style={{ width: "100%" }}>

                                        <Link style={{ color: "black", textDecoration: "none" }} to={'/admin/update_Admin'} className={` ${location.pathname === '/admin/update_Admin' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}>
                                            {!toggle && <div style={{ cursor: "pointer" }} className={`pl-[3rem] pt-3 pb-3 nav-active ${location.pathname === '/admin/update_Admin' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}><i className="fa-solid fa-table-columns mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Update Admin</div>}
                                        </Link>
                                    </div>
                                    <div className="mt-4 mb-3 h-[2rem]" style={{ width: "100%" }}>

                                        <Link style={{ color: "black", textDecoration: "none" }} to={'/admin/all_Admin'} className={` ${location.pathname === '/admin/all_Admin' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}>
                                            {!toggle && <div style={{ cursor: "pointer" }} className={`pl-[3rem] pt-3 pb-3 nav-active ${location.pathname === '/admin/all_Admin' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}><i className="fa-solid fa-table-columns mx-3 fa-lg" style={{ color: "#4460EF" }}></i>All Admin</div>}
                                        </Link>
                                    </div>
                                   
                                </div>
                            </div>
                        )}


                        {/* for the visitors */}
                        <button
                            style={{ color: "black", textDecoration: "none", textAlign: "left" }}
                            onClick={VisitorFunc}
                            className={`pt-3 pl-3 pb-3 ${visitorDetails === true && !toggle ? 'nav-link active' : 'nav-link'}`}
                        >
                            {!toggle && <div style={{ cursor: "pointer", height: "100%", width: "100%" }} className="nav-active"><i className="fa-regular fa-user mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Visitors</div>}
                        </button>
                        {visitorClick && (
                            <div className={`bgdropdown ml-[-0.3rem] transition-all duration-300 ${toggle ? 'opacity-0 h-0' : 'opacity-100 h-auto'}`}>
                                <div>
                                    <div className="w-full h-[2rem]">
                                        <Link style={{ color: "black", textDecoration: "none" }} to={'/visitor/visitor_Registration'} className={` ${location.pathname === '/visitor/visitor_Registration' && !toggle ? 'nav-link' : 'nav-link'}`}>
                                            {!toggle && <div style={{ cursor: "pointer" }} className={`pl-[3rem] pt-3 pb-3 nav-active ${location.pathname === '/visitor/visitor_Registration' && !toggle ? 'nav-link dropactive' : 'nav-link'}`}><i className="fa-solid fa-table-columns mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Add Visitors</div>}
                                        </Link>
                                    </div>

                                   
                                </div>
                            </div>
                        )}
                        {/* <Link style={{ color: "black", textDecoration: "none" }} to={'/admin/requests'} className={`pt-3 pb-3 ${activeLink === '/admin/requests' && !toggle ? 'nav-link active' : 'nav-link'}`}>
                            {!toggle && <div style={{ cursor: "pointer", height: "100%", width: "100%" }} className="nav-active"><i className="fa-solid fa-phone mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Call Requests</div>}
                        </Link>
                        <Link style={{ color: "black", textDecoration: "none" }} to={'/admin/drivers'} className={`pt-3 pb-3 ${activeLink === '/admin/drivers' && !toggle ? 'nav-link active' : 'nav-link'}`}>
                            {!toggle && <div style={{ cursor: "pointer", height: "100%", width: "100%" }} className="nav-active"><i className="fa-regular fa-id-card mx-3 fa-lg" style={{ color: "#4460EF" }}></i>Drivers</div>}
                        </Link> */}
                    </div>
                </div>
                <div className="responsivemargin" style={{ width: `${!toggle ? "85%" : "100%"}`, marginLeft: `${!toggle ? "15%" : "3.8rem"}` }} >
                    <div className="flex items-center" style={{ height: "9vh", position: "fixed", width: `${!toggle ? "85%" : "100%"}`, borderBottom: "1px solid #cfc6c6",backgroundColor:'white' }}>
                        <div>
                            <i className="px-2 fa-solid fa-bars" onClick={toggleSidebar} style={{ cursor: "pointer" }}></i>
                        </div>
                    </div>
                    {/* <div style={{ marginTop: "9vh", width: `${!toggle ? "100%" : "99%"}`, backgroundColor:"#f2f4f6" }}>
                    </div> */}
                    <div style={{ zIndex: "-10", position: "absolute", width: `${!toggle ? "85%" : "100%"}`, minHeight: "91vh", backgroundColor: "#F9F8FD", marginLeft: `${!toggle ? "0%" : "-2%"}`, top: "9vh", left: `${!toggle ? "15%" : "2%"}` }}>
                        {element}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Nav;





