import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Link } from "react-router-dom";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import NavBar from "../../components/navBar";
import axios from "axios";
import { useSnackbar } from "notistack";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomizedTables = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3030/api/employees/", { crossdomain: true })
      .then((res) => {
        setEmployees(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Error", { variant: "Error" });
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <br></br>

      <TableContainer component={Paper}>
        <Link to= "/employee/add" >
          <Button variant="outlined" style={{ marginLeft: "20px", marginRight: "20px" , marginBottom : "15px"}} startIcon={<AddBoxIcon />}>
            Add New Employee
          </Button>
        </Link>
        <Table sx={{ maxWidth: 1875, p: 10 }} style={{ marginLeft: "20px", marginRight: "20px" }}  aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">First name</StyledTableCell>
              <StyledTableCell align="left">Last name</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Salary</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <StyledTableRow key={employee.id}>
                <StyledTableCell component="th" scope="row">
                  {employee.id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {employee.firstname}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {employee.lastname}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {employee.address}
                </StyledTableCell>
                <StyledTableCell align="right">{employee.salary}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link to={`/employee/edit/${employee._id}`}>
                    <Button
                      variant="text"
                      fontSize="large"
                      startIcon={<EditRoundedIcon />}
                    />
                  </Link>
                  <Link to={`/employee/delete/${employee._id}`}>
                    <Button
                      variant="text"
                      fontSize="large"
                      startIcon={<DeleteRoundedIcon />}
                    />
                  </Link>
                  <Link to={`/employee/info/${employee._id}`}>
                  <Button
                    variant="text"
                    fontSize="large"
                    startIcon={<InfoRoundedIcon />}
                  />
                  </Link>

                  
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomizedTables;
