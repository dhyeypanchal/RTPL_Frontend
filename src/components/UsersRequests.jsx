import { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Breadcrumb from './Breadcrumb';
import '../css/users.css'
import { useUserInfo } from '../context/users';
import instance from '../utils/axios';


function UsersRequests() {

    // const [users,setUsers] = useState([])
    const [data,setData] = useState([])
    const [change, setChange] = useState(false);

    const {getRequestUsers} = useUserInfo()
    useEffect(()=>{
        const getData = async()=>{
            const data = await getRequestUsers();
            // const deleteddata = await getNotDeletedUsers();
            // const combined = [...data, ...deleteddata];  // in backend code there is problem because we want both isactive and isdeleted in one go
            // setUsers(combined)
            // console.log(users);
            const totaldata = data.map((user)=>({
                    EmpId:user.empId,
                    FirstName:user.firstName,
                    LastName:user.lastName,
                    Email:user.email,
                    MobileNo:user.phone
            }))
            setData(totaldata)
            setFilterData(totaldata)
        }
        getData()
    },[change])

    
    



    // const getAllUsers = async () => {
    //     const response = await instance.get("/api/visitor/get_visitor_req_list") //here check for header is remaining
    //     console.log(response.data.meetings[0].employee);
    // }
    // useEffect(()=>{
    //     getAllUsers()
    // },[])

    const [filterData, setFilterData] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [active, setActive] = useState(false);
    const [rowid, setId] = useState(null);



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
    // useEffect(() => {
    //     setFilterData(userdata)
    // }, []); //i put userdata here


    const handleAddData = (newUser) => {
        // Add the new stock to the existing data
        setFilterData((prevData) => [...prevData, newUser]);
    };

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



    const handleApprove = async(row) => {
        const token = localStorage.getItem("token")
        try {
            const response = await instance.put("/api/employee/activateEmployee", {
                empId: row.EmpId,
                isActive: true
            },{headers:{
                Authorization:`Bearer ${token}`
            }})
            console.log(response.data);
            if (data.length==1) {
                window.location.reload();
            }
            setChange(!change)
            
        } catch (error) {
            console.error("Error activating employee:", error);
        }
    };

    
    const handleNotApprove = async(row) => {
        const token = localStorage.getItem("token")
        try {
            const response = await instance.delete(`/api/employee/${row.EmpId}?isDeleted=1`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data);
            if (data.length == 1) {
                window.location.reload();
            }
            setChange(!change)

        } catch (error) {
            console.error("Error activating employee:", error);
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
            name: <span style={{ fontSize: "125%" }}><i className="fa-solid fa-list" style={{ marginRight: "4px" }} />Sr. No</span>,
            selector: (row) => row.EmpId,
            cell: (row) => <span>{row?.EmpId}</span>,
            sortable: true,
            center: true,
            minWidth: "120px"
        },
        {
            name: <span style={{ fontSize: "125%" }}><i className='fa-solid fa-user' style={{ marginRight: "4px", fontSize: "18px" }} ></i>First Name</span>,
            selector: (row) => row.FirstName,
            cell: (row) => <span>{row?.FirstName}</span>,
            sortable: true,
            center: true,
            minWidth: "165px"
        },
        {
            name: <span style={{ fontSize: "125%" }}><i className='fa-solid fa-user' style={{ marginRight: "4px", fontSize: "18px" }} ></i>Last Name</span>,
            selector: (row) => row.LastName,
            cell: (row) => <span>{row?.LastName}</span>,
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
            name: <span style={{ fontSize: "125%", cursor: 'pointer' }}><i className="fa-solid fa-city" style={{ marginRight: "4px" }} />User Request</span>,
            selector: (row) => row.Button,
            cell: row => (
                <>
                    <button
                        className={`p-1 mr-3 rounded-md w-20 bg-green-600 text-white`}
                        onClick={() => handleApprove(row)}
                    >
                        Approve
                    </button>
                    <button
                        className={`p-1 rounded-md w-20 bg-red-600 text-white w-[6rem]`}
                        onClick={() => handleNotApprove(row)}
                    >
                        Not Approve
                    </button>
                </>
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
                                                <span style={{ fontSize: "80%" }} className='mobilenone'>Search:</span> <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" className='p-1 rounded-1' placeholder='Search' style={{ fontSize: "80%", border: "1.5px solid #D2D2D2" }} />
                                            </div>
                                        </span>
                                    </span>
                                </span>
                            </div>
                        }
                    />

                </div>
            </div>
        </>
    )
}

export default UsersRequests;

