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
import ConfirmEmail from "./pages/ConfirmEmail";
import ProtectedRoute from "./route/ProtectedRoute";
import {AuthProvider} from "./context/AuthContext";
import PublicRoute from "./route/PublicRoute";
import Messenger from "./pages/Messenger";


function App() {

    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <Navbar/>
                    <Routes>
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/cars" element={<CarsPage/>}/>
                            <Route path="/cargo" element={<CargoPage/>}/>
                            <Route path="/add-car" element={<AddCar/>}/>
                            <Route path="/add-cargo" element={<AddCargo/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/chats" element={<Messenger/>}/>
                            <Route path="/edit-profile" element={<EditProfile/>}/>
                            <Route path="/notifications" element={<Notifications/>}/>
                            <Route path="/responses" element={<Responses/>}/>
                            <Route path="/match" element={<Match/>}/>
                        </Route>
                        <Route element={<PublicRoute/>}>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/registration" element={<Registration/>}/>
                            <Route path="/confirmEmail" element={<ConfirmEmail/>}/>
                        </Route>
                    </Routes>
                    <Footer/>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
