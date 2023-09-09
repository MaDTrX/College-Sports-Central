import { Route, Routes } from "react-router-dom";
import Flights from "./pages/Flights/Flights";
import Dashboard from "./pages/Dashboard/DashBoard";
import Footer from "components/Footer/Footer";
import NavBar from "components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { getUser } from "./utilities/users-service";
import "./app.css";

const options = {
    method: "GET",
    credentials: "include",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
};
export default function App() {
    const [user, setUser] = useState(getUser());
    const [hide, setHide] = useState();
    const [checked, setChecked] = useState(false);

    function handleHide(evt) {
        setHide(evt.target.value);
    }
    function handleChange(evt) {
        setChecked(!checked);
    }

    return (
        <main className="body">
            {user ? (
                <>
                    <NavBar
                        hide={hide}
                        handleChange={handleChange}
                        checked={checked}
                        user={user}
                        setUser={setUser}
                    />
                    <Routes>
                        {/* <Route path="/" element={<Dashboard />} /> */}
                        <Route path="/" element={<Flights />} />
                    </Routes>
                    <footer className="footer">
                        <Footer />
                    </footer>
                </>
            ) : (
                <div className="section">
                    <NavBar
                        hide={hide}
                        handleChange={handleChange}
                        checked={checked}
                        user={user}
                        setUser={setUser}
                    />
                    <footer className="footer">
                        <Footer />
                    </footer>
                </div>
            )}
        </main>
    );
}
