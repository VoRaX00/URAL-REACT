import "./styles/bootstrap5/css/bootstrap.css"

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import User from "./Entity/User";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import MainPage from "./pages/Main";
import CarsPage from "./pages/Cars";
import CargoPage from "./pages/Cargo";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AddCar from "./pages/AddCar";
import AddCargo from "./pages/AddCargo";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Notifications from "./pages/Notifications";
import Match from "./pages/Match";
import Responses from "./pages/Responses";
import {useEffect, useState} from "react";


function App() {
    const [token, setToken] = useState("");
    // const [id, setId] = useState('');
    // const [name, setName] = useState('Nikita');
    // const [email, setEmail] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [aboutMe, setAboutMe] = useState('');
    // const [image, setImage] = useState('');


    // useEffect(() => {
    //     (
    //         async () => {
    //             const response = await fetch('http://localhost:5036/api/user', {
    //                 headers: {"Content-Type": "application/json"},
    //                 credentials: 'include',
    //             });
    //
    //             const content = await response.json();
    //
    //             if(content.message !== 'unauthorized') {
    //                 setName(content.name);
    //             }
    //             else{
    //                 setName('');
    //             }
    //         }
    //     )();
    // });

    return (
        <div className="App">
            <Router>
                <Navbar token={token} />
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<Login setToken={setToken} />}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/cars" element={<CarsPage token={token} />}/>
                    <Route path="/cargo" element={<CargoPage token={token}/>}/>
                    <Route path="/add-car" element={<AddCar token={token}/>}/>
                    <Route path="/add-cargo" element={<AddCargo token={token}/>}/>
                    <Route path="/profile" element={<Profile token={token}/>}/>
                    <Route path="/edit-profile" element={<EditProfile token={token}/>}/>
                    <Route path="/notifications" element={<Notifications token={token}/>}/>
                    <Route path="/responses" element={<Responses token={token}/>}/>
                    <Route path="/match" element={<Match token={token}/>}/>
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
