import "./styles/bootstrap5/css/bootstrap.css"
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import MainPage from "./pages/Main";
import CarsPage from "./pages/Cars";
import CargoPage from "./pages/Cargo";

function App() {
    return (
        <div className="App">
            <Navbar />

            {/*<MainPage />*/}
            {/*<CarsPage />*/}
            <CargoPage />
            <Footer />
        </div>
    );
}

export default App;
