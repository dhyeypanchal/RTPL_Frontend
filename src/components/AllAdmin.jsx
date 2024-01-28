import { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Breadcrumb from './Breadcrumb';
import '../css/users.css'
import { useUserInfo } from '../context/users';
import instance from '../utils/axios';
import AddUserData from './AddUserData';

import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function AllAdmin() {

    // const [users,setUsers] = useState([])
    const [data, setData] = useState([])
    const [change, setChange] = useState(false);

    const navigate = useNavigate()


    useEffect(() => {
        const token = localStorage.getItem("token")
        const getData = async () => {
            const response = await instance.get("/api/admin/getAdminList",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            // console.log(response.data.meetings);

            // setUsers(combined)
            // console.log(users);
            const totaldata = response.data.data.map((admin) => ({
                id: admin.empId,
                FirstName: admin.firstName,
                LastName:admin.lastName,
                Email:admin.email,
                Phone:admin.phone,
                emp_code:admin.emp_code
            }))
            setData(totaldata)
            setFilterData(totaldata)
        }
        getData()
    }, [change])



    const [filterData, setFilterData] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [active, setActive] = useState(false);


    // filerdata
    useEffect(() => {
        const filterData = () => {
            const filter = data.filter((data) =>
                data.FirstName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilterData(filter);
        };
        filterData();
    }, [searchQuery]);




    const initialValues = {
        id: "",
        FirstName: "",
        LastName:"",
        Email:"",
        Phone:"",
        emp_code:""
    }


    const handleAddData = () => {
        // Add the new stock to the existing data
        // setFilterData((prevData) => [...prevData, newData]);
        setChange(!change)
    };

    const handleEdit = async(code) => {
        console.log(code);
        const request = await instance.get(`/api/employee/getEmployeeByEmpCode/${code}`)
        navigate("/admin/update_Admin", { state: { data: request.data.employees[0]}})
    }



    const deleteAdminData = async (cell) => {
        const token = localStorage.getItem("token")

        // axios request
        try {
            const req = await instance.delete(`/api/admin/${cell.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (req.status === 200) {
                toast.success("Successfully deleted the data");
                setFilterData(prev => {
                    return prev.filter(data => data.id !== cell.id);
                });
            }
        } catch (error) {
            toast.error("Unable to delete the data");
        }
    }



    const columns = [
        {
            name: <span style={{ fontSize: "125%" }}><i className="fa-solid fa-calendar-days" style={{ marginRight: "4px" }} />Id</span>,
            selector: (row) => row.id,
            cell: row => <span>{row?.id}</span>,
            sortable: true,
            center: true,
            minWidth: "100px"
        },
        {
            name: <span style={{ fontSize: "125%" }}><i className="fa-solid fa-list" style={{ marginRight: "4px" }} />First Name</span>,
            selector: (row) => row.FirstName,
            cell: (row) => <span>{row?.FirstName}</span>,
            sortable: true,
            center: true,
            minWidth: "150px"
        },
        {
            name: <span style={{ fontSize: "125%" }}><i className="fa-solid fa-list" style={{ marginRight: "4px" }} />Last Name</span>,
            selector: (row) => row.LastName,
            cell: (row) =>  <span>{row?.LastName}</span>,
            sortable: true,
            center: true,
            minWidth: "150px"
        },
        {
            name: <span style={{ fontSize: "125%" }}><i className="fa-solid fa-list" style={{ marginRight: "4px" }} />Email</span>,
            selector: (row) => row.Email,
            cell: (row) => <span>{row?.Email}</span>,
            sortable: true,
            center: true,
            minWidth: "150px"
        },
        {
            name: <span style={{ fontSize: "125%" }}><i className="fa-solid fa-list" style={{ marginRight: "4px" }} />Mobile No.</span>,
            selector: (row) => row.Phone,
            cell: (row) => <span>{row?.Phone}</span>,
            sortable: true,
            center: true,
            minWidth: "150px"
        },
        {
            cell: (row) =>
                <span style={{ display: "flex", justifyContent: "space-between", width: "60px" }}>
                    {
                        <>
                            <span
                                style={{ cursor: "pointer" }}
                                onClick={() => { handleEdit(row.emp_code) }}
                            >
                                <HiOutlinePencilAlt style={{ fontSize: "20px" }} />
                            </span>
                            <span
                                style={{ cursor: "pointer" }}
                                onClick={() => { deleteAdminData(row) }}
                            >
                                <MdOutlineDeleteOutline style={{ fontSize: "20px" }} />
                            </span>
                        </>
                    }
                </span>,
            width: "120px",
            maxWidth: "120px",
            minWidth: "120px"
        }


    ]


    return (
        <>

            <div className="px-5 py-4 removepadding">
                <Breadcrumb />
            </div>
            <div className='flex flex-col items-center' style={{ width: "100%" }}>

                <div className='userDetails'>
                    <DataTable
                        className='datatable scrolldatatable'
                        columns={columns}
                        data={filterData}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight='430px'
                        highlightOnHover
                        paginationRowsPerPageOptions={[5, 10, 15, 20, 50,]}
                        responsive
                        striped
                        subHeader
                        subHeaderAlign='right'
                        subHeaderComponent={
                            <div className='exportContainer'>
                                <span className='exportBoxes'>
                                    <span>
                                        <span className='export'>
                                            <div>
                                                <span style={{ fontSize: "80%" }} className='mobilenone'>Search:</span> <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" className='p-1 rounded-1' placeholder='Search' style={{ fontSize: "80%", width: "6.98rem", border: "1.5px solid #D2D2D2" }} />
                                            </div>
                                        </span>
                                    </span>
                                    <span>
                                        <Link to="/admin/add_Admin" className='addBtn'>Add New</Link>
                                    </span>
                                </span>
                                <AddUserData
                                    isOpen={isDrawerOpen}
                                    onClose={() => setIsDrawerOpen(false)}
                                    onAddData={handleAddData}
                                    meetingmode={true}
                                // email={email}
                                />
                            </div>
                        }
                    />

                </div>
            </div>
        </>
    )
}

export default AllAdmin;
