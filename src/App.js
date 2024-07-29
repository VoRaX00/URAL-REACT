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
                    <Route userId={user.id} path="/cars" element={<CarsPage/>}/>
                    <Route userId={user.id} path="/cargo" element={<CargoPage/>}/>
                    <Route userPhone={user.phoneNumber} path="/add-car" element={<AddCar/>}/>
                    <Route userPhone={user.phoneNumber} path="/add-cargo" element={<AddCargo/>}/>
                    <Route user={user} path="/profile" element={<Profile/>}/>
                    <Route user={user} path="/edit-profile" element={<EditProfile/>}/>
                    <Route userId={user.id} path="/notifications" element={<Notifications/>}/>
                    <Route userId={user.id} path="/responses" element={<Responses/>}/>
                    <Route userId={user.id} path="/match" element={<Match/>}/>
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
