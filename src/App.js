import "./styles/bootstrap5/css/bootstrap.css"
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import MainPage from "./pages/Main";
import CarsPage from "./pages/Cars";

function App() {
    return (
        <div className="App">
            <Navbar />

            {/*<MainPage />*/}
            <CarsPage />
            <Footer />
        </div>
    );
}

export default App;
