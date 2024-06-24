import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/login.tsx";
import StudentHomePage from "./pages/student/StudentHomePage.tsx";
import Home from "./pages/student/Home.tsx";
import Vote from "./pages/student/Vote.tsx";
import Candidature from "./pages/student/Candidature.tsx";
import Resultat from "./pages/student/Resultat.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <div>Admin</div>,
  },
  {
    path: "/student",
    element: <StudentHomePage />,
    children:[
      {
        path:'',
        element:<Home/>
      }
      ,{
        path:'vote',
        element:<Vote/>
      },
      {
        path:'candidature',
        element: <Candidature/>
      },
      {
        path:'resultat',
        element: <Resultat/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
