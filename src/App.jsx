import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "./Components/Header/Header";
import MainInputBox from "./Components/MainInputBox/MainInputBox";
import { ResponsePanel } from "./Components/Response";

import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";

import { getCurrentUser } from "./Appwrite/AuthService";
import { login } from "./Store/authSlice";
import History from "./Components/History/History";

function Home() {

    return (
        <div className="min-h-screen bg-gray-50">

            <Header />

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">

                    <MainInputBox />

                    <ResponsePanel />

                </div>

            </main>

        </div>
    );
}


function App() {

    const dispatch = useDispatch();


    useEffect(() => {

        const checkUser = async () => {

            const user = await getCurrentUser();

            if (user) {

                console.log("Existing session:", user);

                dispatch(login(user));

            }

        };

        checkUser();

    }, [dispatch]);


    return (

        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            <Route
                path="/History"
                element={<History />}
            />

        </Routes>

    );
}


export default App;