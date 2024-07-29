import "./styles/bootstrap5/css/bootstrap.css"

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

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

    const [user, setUser] = useState(null);
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
                <Navbar name={user.name} setName={user.setName} />
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/cars" element={<CarsPage/>}/>
                    <Route path="/cargo" element={<CargoPage/>}/>
                    <Route path="/add-car" element={<AddCar/>}/>
                    <Route path="/add-cargo" element={<AddCargo/>}/>
                    <Route  path="/profile" element={<Profile/>}/>
                    <Route path="/edit-profile" element={<EditProfile/>}/>
                    <Route path="/notifications" element={<Notifications/>}/>
                    <Route path="/responses" element={<Responses/>}/>
                    <Route path="/match" element={<Match/>}/>
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
