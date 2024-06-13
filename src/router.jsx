import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Stuff from "./pages/Stuff/Index";
import StuffCreate from "./pages/Stuff/Create";
import StuffEdit from "./pages/Stuff/Edit";
import StuffTrash from "./pages/Stuff/Trash";
import Dashboard from "./pages/Dashboard";
import Lending from "./pages/Lending/index.jsx";
import Inbound from "./pages/Inbound/index.jsx";
import InboundCreate from "./pages/Inbound/create";
import LendingCreate from "./pages/Lending/create.jsx";
import LendingEdit from "./pages/Lending/index.jsx";
import User from "./pages/User/Index";
import UserCreate from "./pages/User/Create";
import UserEdit from "./pages/User/Edit";
import UserTrash from "./pages/User/Trash";
import InboundEdit from "./pages/Inbound/Edit";


export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/stuff', element: <Stuff /> },
    { path: '/stuff/create', element: <StuffCreate /> },
    { path: '/stuff/edit/:id', element: <StuffEdit /> }, 
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/lending', element: <Lending/> },
    { path: '/inbound', element: <Inbound/> },
    { path: '/inbound/create', element: <InboundCreate/> },
    { path: '/lending/create', element: <LendingCreate/> },
    { path: '/user/', element: <User/> },
    { path: '/stuff/trash', element: <StuffTrash /> }, 
    { path: '/lending/edit', element: <LendingEdit /> }, 
    { path: '/user/trash', element: <UserTrash /> }, 
    { path: '/user/create', element: <UserCreate /> }, 
    { path: '/user/edit', element: <UserEdit/> }, 
    { path: '/inbound/edit', element: <InboundEdit/> }, 
    
])

