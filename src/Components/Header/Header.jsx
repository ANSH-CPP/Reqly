// import React from "react";
// import {useNavigate, useLocation, Link} from 'react-router-dom'

// function Header(){

//     let authStatus = false;
//     const navigate = useNavigate()
//     const location = useLocation()

//     const navItems = [
//         {
//             name: 'Home',
//             path: '/',
//             active: true
//         },
//         {
//             name: 'Login',
//             path: '/login',
//             active: !authStatus,
//         },
//         {
//             name : 'Signup',
//             path: '/signup',
//             active : !authStatus,
//         },
//         {
//             name: 'History',
//             path : '/History',
//             active: !authStatus
//         }
//     ]

//     return(
//         <>
//             <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
//                 <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
//                     <nav className="flex w-full flex-wrap items-center justify-between gap-4">


//                         <div>
//                             <Link to='/' className="flex items-center gap-2.5">
//                                 <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-sm font-bold text-white">
//                                     A
//                                 </span>
//                                 <h2 className="text-base font-semibold tracking-tight text-gray-900">API Checker</h2>
//                             </Link>
//                         </div>


//                         <div>

//                             <ul className="flex items-center gap-1">

//                                 {navItems.map((item)=>{
//                                     if(item.active){
//                                         const isCurrent = location.pathname === item.path
//                                         return(
//                                             <li key={item.name}>
//                                                 <button
//                                                 className={
//                                                     "cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:outline-none " +
//                                                     (isCurrent
//                                                         ? "bg-gray-100 text-gray-900"
//                                                         : "text-gray-600 hover:bg-gray-50 hover:text-gray-900")
//                                                 }

//                                                 // WRONG : navigate means run immediately
//                                                 // onClick={navigate(item.path)}

//                                                 //HERE using callback means when click then navigate
//                                                 onClick={()=>navigate(item.path)}
//                                                 >
//                                                     {item.name}
//                                                 </button>
//                                             </li>
//                                         )
//                                     }
//                                     return null
//                                 })}

//                                 {authStatus && (
//                                     <li>
//                                         {/* <LogoutBtn/> */}
//                                     </li>
//                                 )}
//                             </ul>

//                         </div>


//                     </nav>
//                 </div>
//             </header>
//         </>
//     )
// }

// export default Header



import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout as logoutUser } from "../../Appwrite/AuthService";
import { logout } from "../../Store/authSlice";

function Header() {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Get authentication state from Redux
    const { status: authStatus, userData } = useSelector(
        (state) => state.auth
    );


    const navItems = [
        {
            name: "Home",
            path: "/",
            active: true
        },
        {
            name: "Login",
            path: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            path: "/signup",
            active: !authStatus
        },
        {
            name: "History",
            path: "/History",
            active: authStatus
        }
    ];


    const handleLogout = async () => {

        try {

            // Logout from Appwrite
            await logoutUser();

            // Logout from Redux
            dispatch(logout());

            // Navigate to login
            navigate("/login");

        } catch (error) {

            console.error("Logout Error:", error);

        }
    };


    return (
        <>
            <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">

                <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6 lg:px-8">

                    <nav className="flex w-full flex-wrap items-center justify-between gap-4">


                        {/* Logo */}

                        <div>

                            <Link
                                to="/"
                                className="flex items-center gap-2.5"
                            >

                                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-sm font-bold text-white">
                                    A
                                </span>

                                <h2 className="text-base font-semibold tracking-tight text-gray-900">
                                    API Checker
                                </h2>

                            </Link>

                        </div>


                        {/* Navigation */}

                        <div>

                            <ul className="flex items-center gap-1">

                                {navItems.map((item) => {

                                    if (item.active) {

                                        const isCurrent =
                                            location.pathname === item.path;

                                        return (
                                            <li key={item.name}>

                                                <button
                                                    className={
                                                        "cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:outline-none " +
                                                        (
                                                            isCurrent
                                                                ? "bg-gray-100 text-gray-900"
                                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                        )
                                                    }
                                                    onClick={() =>
                                                        navigate(item.path)
                                                    }
                                                >
                                                    {item.name}
                                                </button>

                                            </li>
                                        );
                                    }

                                    return null;
                                })}


                                {/* Logged in user */}

                                {authStatus && (
                                    <>

                                        {/* User Name */}

                                        <li>

                                            <span className="px-3 py-1.5 text-sm font-medium text-gray-700">
                                                {userData?.name ||
                                                    userData?.email}
                                            </span>

                                        </li>


                                        {/* Logout */}

                                        <li>

                                            <button
                                                onClick={handleLogout}
                                                className="cursor-pointer rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-600"
                                            >
                                                Logout
                                            </button>

                                        </li>

                                    </>
                                )}

                            </ul>

                        </div>

                    </nav>

                </div>

            </header>
        </>
    );
}

export default Header;