import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import AddUserData from './AddUserData';
import Breadcrumb from './Breadcrumb';
import '../css/users.css'
import { Link } from 'react-router-dom';
import { useUserInfo } from '../context/users';
import { toast } from 'react-toastify';
import instance from '../utils/axios';


function UsersHistory() {

    const [change, setChange] = useState(false);


    const [data,setData] = useState([])
    const [filterData, setFilterData] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [active, setActive] = useState(false);
    const [rowid, setId] = useState(null);


    const {getUsersHistory} = useUserInfo()

    useEffect(() => {
        const getData = async () => {
            const data = await getUsersHistory();

            const totaldata = data.map((user) => ({
                EmpId: user.empId,
                FirstName: user.firstName,
                LastName: user.lastName,
                Email: user.email,
                MobileNo: user.phone,
                Button: user.isActive == true ? "Active" : "Not Active"
            }))
            setData(totaldata)
            setFilterData(totaldata)
        }
        getData()
    }, [change])



    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const userdata = [
    //     {
    //         SrNo: 1,
    //         Name: "Rishabh",
    //         Email: "rahul@gmail.com",
    //         MobileNo: 9874562314,
    //         Button: "Active"
    //     },
    //     {
    //         SrNo: 2,
    //         Name: "Chirag",
    //         Email: "rahul@gmail.com",
    //         MobileNo: 9874562314,
    //         Button: "Active"
    //     },
    //     {
    //         SrNo: 3,
    //         Name: "Meet",
    //         Email: "rahul@gmail.com",
    //         MobileNo: 9874562314,
    //         Button: "Not Active"
    //     },
    //     {
    //         SrNo: 4,
    //         Name: "Dhaval",
    //         Email: "rahul@gmail.com",
    //         MobileNo: 9874562314,
    //         Button: "Active"
    //     },
    //     {
    //         SrNo: 5,
    //         Name: "Dhyey",
    //         Email: "rahul@gmail.com",
    //         MobileNo: 9874562314,
    //         Button: "Active"
    //     },
    //     {
    //         SrNo: 6,
    //         Name: "Jay",
    //         Email: "rahul@gmail.com",
    //         MobileNo: 9874562314,
    //         Button: "Active"
    //     }
    // ]


    const handleAddData = (newData) => {
        // Add the new stock to the existing data
        setFilterData((prevData) => [...prevData, newData]);
    };
    // console.log(filterData);

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


    // const handleClick = (row)=>{
    //     setId(row.id);
    //     setActive(!active)
    //     // console.log(e.target.style);
    // }


    const [activeRow, setActiveRow] = useState(null);


    const handleClick = async(row) => {
        let approve = "";
        if (activeRow === row.EmpId) {
            setActiveRow(null);
        } else {
            // console.log(row.Button);
            setActiveRow(row.EmpId);
            // console.log(row.Button);
            if (row.Button === "Active") {
                approve = "Not Active";
            }
            else {
                approve = "Active"
            }
            try {
                const token = localStorage.getItem("token")
                // req. to the backend
                if (row.Button==="Active") {
                    const response = await instance.delete(`/api/employee/${row.EmpId}?isDeleted=1`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    console.log(response.data);
                    setChange(!change)
                    if (data.length==1) {
                        window.location.reload()
                    }
                }
                else{
                    const response = await instance.delete(`/api/employee/${row.EmpId}?isDeleted=0`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    console.log(response.data);
                    setChange(!change)
                    if (data.length == 1) {
                        window.location.reload()
                    }
                }
            } catch (error) {
                toast.error("Error while changing the state")
            }
        }
    };
    const columns = [
        // {
        //   name: <span style={{ fontSize: "125%" }}><i className="fa-solid fa-calendar-days" style={{ marginRight: "4px" }} />Id</span>,
        //   selector: 'id',
        //   cell: row => row?.id,
        //   sortable: true,
        //   center: true,
        //   minWidth: "120px"
        // },
        {
            name: <span style={{ fontSize: "125%" }}><i className="fa-solid fa-list" style={{ marginRight: "4px" }} />EmpId</span>,
            selector: (row) => row.EmpId,
            cell: (row) => <span>{row?.EmpId}</span>,
            sortable: true,
            center: true,
            minWidth: "120px"
        },
        {
            name: <span style={{ fontSize: "125%" }}><i className='fa-solid fa-user' style={{ marginRight: "4px", fontSize: "18px" }} ></i>First Name</span>,
            selector: (row) => row.FirstName,
            cell: (row) => <Link to={{ pathname: '/admin/users/reg_details', state: { email: row.email } }} className='cursor-pointer'>{row?.FirstName}</Link>,
            sortable: true,
            center: true,
            minWidth: "165px"
        },
        {
            name: <span style={{ fontSize: "125%" }}><i className='fa-solid fa-user' style={{ marginRight: "4px", fontSize: "18px" }} ></i>Last Name</span>,
            selector: (row) => row.LastName,
            cell: (row) => <Link to={{ pathname: '/admin/users/reg_details', state: { email: row.email } }} className='cursor-pointer'>{row?.LastName}</Link>,
            sortable: true,
            center: true,
            minWidth: "165px"
        },
        {
            name: <span style={{ fontSize: "125%", cursor: 'pointer' }}><i className="fa-solid fa-envelope" style={{ marginRight: "8px" }} />Email</span>,
            selector: (row) => row.Email,
            cell: row => <span>{row?.Email}</span>,
            sortable: true,
            center: true,
            minWidth: "140px"
        },
        {
            name: <span style={{ fontSize: "125%", cursor: 'pointer' }}><i className="fa-solid fa-phone" style={{ marginRight: "8px" }} />Mobile No</span>,
            selector: (row) => row.MobileNo,
            cell: (row) => <span>{row?.MobileNo}</span>,
            sortable: true,
            center: true,
            minWidth: "180px"
        },
        {
            name: <span style={{ fontSize: "125%", cursor: 'pointer' }}><i className="fa-solid fa-city" style={{ marginRight: "4px" }} />Approve</span>,
            selector: (row) => row.Button,
            cell: row => (
                <button
                    className={`p-1 rounded-md w-20 ${activeRow === row.EmpId ? (row.Button === "Active" ? "bg-red-600 text-white" : "bg-green-600 text-white") : (row.Button === "Active" ? "bg-green-600 text-white" : "bg-red-600 text-white")}`}
                    onClick={() => handleClick(row)}
                >
                    {activeRow === row.EmpId ? (row.Button === "Active" ? "Not Active" : "Active") : row.Button}
                </button>
            ),
            sortable: true,
            center: true,
            minWidth: "200px"
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
                        className='datatable'
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
                                                <span style={{ fontSize: "80%" }} className='mobilenone'>Search:</span> <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" className='p-1 rounded-1' placeholder='Search' style={{ width: "6.98rem", fontSize: "80%", border: "1.5px solid #D2D2D2" }} />
                                            </div>
                                        </span>

                                    </span>
                                    <span>
                                        <button className='addBtn' onClick={() => setIsDrawerOpen(true)}>New User</button>
                                    </span>

                                </span>
                            </div>
                        }
                    />

                    <AddUserData
                        isOpen={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}
                        onAddData={handleAddData}
                    />
                </div>
            </div>
        </>
    )
}

export default UsersHistory

