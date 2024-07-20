import "./styles/bootstrap5/css/bootstrap.css"
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
