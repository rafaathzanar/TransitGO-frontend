import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SearchField from "../../components/SearchField/SearchField";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePagination } from "@mui/lab";
import { Edit, Style, Token } from "@mui/icons-material";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
export default function CRUDtableEmployee({ searchData }) {
  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const [filteredRows, setFilteredRows] = useState(rows); // New state for filtered rows
  const [searchValue, setSearchValue] = useState(""); // New state for search input value
  const [loading, setLoading] = useState(false);

  // const [userData, setUserData] = useState({
  //   fname: '',
  //   lname: '',
  //   email: '',
  //   uname: ''
  // })

  //load user information every time the page is open
  useEffect(() => {
    loadUsers();
  }, []);

  // useEffect(()=>{
  //   handleEdit(employeeId);
  // },[employeeId]);

  //to load the infromations
  const loadUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get("http://localhost:8080/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(result.data);
      const userArray = result.data.userList || [];
      const transformedRows = userArray
        .filter((user) => user.type === "employee")
        .map((user, index) => ({
          id: index + 1,
          employeeId: user.id,
          employeeName: user.fname + " " + user.lname,
          currentBusId: user.busid,
        }));
      console.log(transformedRows);
      setRows(transformedRows);
      setFilteredRows(transformedRows);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoading(false);
  };

  //to delete a user by id
  const deleteUser = async (employeeid) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user ?"
      );
      const token = localStorage.getItem("token");
      if (confirmDelete) {
        const response = await axios.delete(
          `http://localhost:8080/admin/delete/${employeeid}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        loadUsers();
      }
    } catch (error) {
      console.error("Error deleting the user :", error);
    }
  };

  // Function to confirm row deletion
  const handleConfirmDelete = () => {
    const updatedRows = rows.filter((row) => row.employeeId !== selectedRowId);
    setRows(updatedRows);
    setFilteredRows(updatedRows); // Update filteredRows
    handleClose();
  };

  // Function to close delete confirmation dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedRowId(null);
  };

  // Function to handle row edit

  //to get a user by id
  // const handleEdit = async(employeeId) =>{

  //   try{
  //     const token = localStorage.getItem('token');
  //     const response = await axios.get(`http://localhost:8080/admin/get-user/${employeeId}`,{
  //       headers: {Authorization: `Bearer ${token}`}
  //     });
  //     console.log(response)
  //     //const {fname, lname, email, uname} = response.data.user.data;
  //     setUserData({
  //       fname : response.data.user.fname,
  //       lname : response.data.user.lname,
  //       email : response.data.user.email,
  //       uname : response.data.user.uname
  //     });
  //   }catch(error){
  //     console.log("Error fetching user data :", error)
  //   }
  // };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    const filtered = rows.filter(
      (row) =>
        row.employeeId.toString().includes(e.target.value.toString()) ||
        row.employeeName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.currentBusId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredRows(filtered);
  };

  const columns = [
    { field: "employeeId", headerName: "Employee ID", width: 200 },
    { field: "employeeName", headerName: "Employee Name", width: 200 },
    { field: "currentBusId", headerName: "Current Bus ID", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => deleteUser(params.row.employeeId)}
          >
            Delete
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(`edituser/${params.row.employeeId}`)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "70rem",
        backgroundColor: "hsla(190, 96%, 80%, 0.2)",
        marginTop: "30px",
      }}
    >
      <SearchField
        placeholderText="Search Employee"
        value={searchValue}
        onChange={handleSearchChange}
      />
      {loading && <LoadingComponent />}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        hideFooter={true}
        rowHeight={40}
        sx={{
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
