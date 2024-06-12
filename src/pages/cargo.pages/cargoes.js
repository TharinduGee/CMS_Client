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
  const [cargoes, setCargoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3030/api/cargoes/", { crossdomain: true })
      .then((res) => {
        setCargoes(res.data.data);
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
      <div style={{ marginLeft: "20px", marginRight: "20px" , marginBottom : "15px"}}>
        <Link to="/cargo/add" style={{ textDecoration: "none", marginRight: "10px" }}>
          <Button variant="outlined" startIcon={<AddBoxIcon />} color="primary">
            Add New Cargo
          </Button>
        </Link>
        
      </div>
      <TableContainer component={Paper}>
        <Table  sx={{ maxWidth: 1875, p: 10 }} style={{ marginLeft: "20px", marginRight: "20px" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Cargo ID</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="right">Store Id&nbsp;</StyledTableCell>
              <StyledTableCell align="right">Stored By&nbsp;</StyledTableCell>
              <StyledTableCell align="right">
                Handling fee&nbsp;($)
              </StyledTableCell>
              <StyledTableCell align="right">Date & Time&nbsp;</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cargoes.map((cargo) => (
              <StyledTableRow key={cargo._id}>
                <StyledTableCell component="th" scope="row">
                  {cargo._id}
                </StyledTableCell>
                <StyledTableCell align="left">{cargo.name}</StyledTableCell>
                <StyledTableCell align="left">
                  {cargo.description}
                </StyledTableCell>
                <StyledTableCell align="right">{cargo.storeID}</StyledTableCell>
                <StyledTableCell align="right">
                  {cargo.storedBy}
                </StyledTableCell>
                <StyledTableCell align="right">{cargo.amount}</StyledTableCell>
                <StyledTableCell align="right">
                  {cargo.createdAt}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Link to={`/cargo/edit/${cargo._id}`}>
                    <Button
                      variant="text"
                      fontSize="large"
                      startIcon={<EditRoundedIcon />}
                    />
                  </Link>
                  <Link to={`/cargo/delete/${cargo._id}`}>
                    <Button
                      variant="text"
                      fontSize="large"
                      startIcon={<DeleteRoundedIcon />}
                    />
                  </Link>
                  <Link to={`/cargo/info/${cargo._id}`}>
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
