import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import Cargoes from "./pages/cargo.pages/cargoes";
import AddCargo from "./pages/cargo.pages/addCargo";
import EditCargo from "./pages/cargo.pages/editCargo";
import DeleteCargo from "./pages/cargo.pages/deleteCargo";
import Employee from "./pages/employee.pages/employees";
import Login from "./pages/login";
import Signup from "./pages/signup";
import InfoCargo from "./pages/cargo.pages/infoCargo";
import theme from './components/theme'
import AddEmployee from "./pages/employee.pages/addEmployee";
import EditEmployee from "./pages/employee.pages/editEmployee";
import DeleteEmployee from "./pages/employee.pages/deleteEmployee";
import InfoEmployee from "./pages/employee.pages/infoEmployee";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      <Router>
        <Routes>
        
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />

          <Route path="/cargo/" element={<Cargoes />} />
          <Route path="/cargo/add" element={<AddCargo />} />
          <Route path="/cargo/info/:id" element={<InfoCargo/>} />
          <Route path="/cargo/edit/:id" element={<EditCargo />} />
          <Route path="/cargo/delete/:id" element={<DeleteCargo />} />

          <Route path="/employee/" element={<Employee/>} />
          <Route path="/employee/add" element={<AddEmployee/>} />
          <Route path="/employee/info/:id" element={<InfoEmployee/>} />
          <Route path="/employee/edit/:id" element={<EditEmployee/>} />
          <Route path="/employee/delete/:id" element={<DeleteEmployee />} />

        </Routes>
      </Router>
    </div>
    </ThemeProvider>
    
  );
}

export default App;
