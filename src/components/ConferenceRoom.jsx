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

function ConferenceRoom() {

  // const [users,setUsers] = useState([])
  const [data, setData] = useState([])
  const [change, setChange] = useState(false);



  useEffect(() => {
    const getData = async () => {
      const response = await instance.get("/api/conferenceRoom/getConferenceRoomList");
      // console.log(response.data.meetings);

      // setUsers(combined)
      // console.log(users);
      const totaldata = response.data.data.map((conference) => ({
        id: conference.conferenceRoomID,
        OfficeId: conference.officeID,
        ConferenceRoomName: conference.conferenceRoomName
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
        data.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) || data.OfficeId.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilterData(filter);
    };
    filterData();
  }, [searchQuery]);




  const initialValues = {
    id: "",
    CompanyId: "",
    Address: ""
  }

  const [edit, setEdit] = useState(false);
  const [currentEditField, setCurrentEditField] = useState('');
  const [rowid, setId] = useState(null);
  const [editedData, setEditedData] = useState({
    editedId: null,
    ...initialValues
  });

  const handleAddData = () => {
    // Add the new stock to the existing data
    // setFilterData((prevData) => [...prevData, newData]);
    setChange(!change)
  };

  const handleEdit = (index) => {
    setEdit(true);
    setId(index);
    const rowUser = filterData.find((data) => data.id === index);
    const user = { ...rowUser }
    setEditedData({ ...editedData, editedId: index, ...user });
  }

  const cancelEdit = (index) => {
    if (edit && rowid === index) {
      setEdit(false);
      setId(null);
      setEditedData(initialValues);
    }
  }

  const deleteConferenceData = async (cell) => {
    const token = localStorage.getItem("token")

    // axios request
    try {
      const req = await instance.delete(`/api/conferenceRoom/${cell.id}`, {
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

  const saveEdit = async (row) => {
    const token = localStorage.getItem("token")
    console.log(editedData.OfficeId);
    const changedData = { ...editedData };

    try {
      const req = await instance.put(`/api/conferenceRoom/${row.id}`,
        {
          conferenceRoomName: editedData.ConferenceRoomName
        }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      console.log(req.status);
      if (req.status === 200) {
        // Logic
        const updatedData = filterData.map((data) => {
          if (data.id === changedData.editedId) {
            return { ...data, ...changedData };
          }
          return data;
        });
        console.log(updatedData);

        // This is for showing data in tables
        setFilterData(updatedData);

        // Reset edit state and editedData
        setEdit(false);
        setId(null);
        setEditedData(initialValues);
        toast.success("Successfully updated the data");
      }
    } catch (error) {
      toast.error("Error in updating the data");
    }

  }
  // console.log(filterData);


  const handleChange = (e) => {
    setCurrentEditField(e.target.name)
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    e.preventDefault();
  };


  const columns = [
    {
      name: <span style={{ fontSize: "125%" }}><i className="fa-solid fa-calendar-days" style={{ marginRight: "4px" }} />Id</span>,
      selector: (row) => row.id,
      cell: row => <span>{row?.id}</span>,
      sortable: true,
      center: true,
      minWidth: "120px"
    },
    {
      name: <span style={{ fontSize: "125%" }}><i className="fa-solid fa-list" style={{ marginRight: "4px" }} />Office Id</span>,
      selector: (row) => row.OfficeId,
      cell: (row) => <span>{row?.OfficeId}</span>,
      sortable: true,
      center: true,
      minWidth: "150px"
    },
    {
      name: <span style={{ fontSize: "125%" }}><i className="fa-solid fa-list" style={{ marginRight: "4px" }} />Room Name</span>,
      selector: (row) => row.ConferenceRoomName,
      cell: (row) => (edit && rowid === row.id) ?
        <input
          type="text"
          name="ConferenceRoomName"
          className='form-control outline'
          value={editedData.ConferenceRoomName}
          onChange={handleChange}
          autoComplete='off'
          autoFocus={currentEditField === 'ConferenceRoomName'}
        /> : <span>{row?.ConferenceRoomName}</span>,
      sortable: true,
      center: true,
      minWidth: "155px"
    },
    {
      cell: (row) =>
        <span style={{ display: "flex", justifyContent: "space-between", width: "60px" }}>
          {(edit && rowid === row.id) ?
            <>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => { saveEdit(row) }}
              >
                <AiOutlineCheck style={{ fontSize: "20px" }} />
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => { cancelEdit(row.id) }}
              >
                <AiOutlineClose style={{ fontSize: "20px" }} />
              </span>
            </>
            :
            <>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => { handleEdit(row.id) }}
              >
                <HiOutlinePencilAlt style={{ fontSize: "20px" }} />
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => { deleteConferenceData(row) }}
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
                    <button className='addBtn' onClick={() => setIsDrawerOpen(true)}>Add New</button>
                  </span>
                </span>
                <AddUserData
                  isOpen={isDrawerOpen}
                  onClose={() => setIsDrawerOpen(false)}
                  onAddData={handleAddData}
                  conference={true}
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

export default ConferenceRoom;
