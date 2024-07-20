import "./styles/bootstrap5/css/bootstrap.css"

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import MainPage from "./pages/Main";
import CarsPage from "./pages/Cars";
import CargoPage from "./pages/Cargo";
import Login from "./pages/Login";
import Registration from "./pages/Registration";


function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />

                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/cars" element={<CarsPage/>}/>
                    <Route path="/cargo" element={<CargoPage/>}/>
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
