import ReactDOM from "react-dom/client";
import HomePage from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/student/login.tsx";
import AdminLayout from "./pages/admin/layout.tsx";
import AdminPage from "./pages/admin/admin.tsx";
import LogOut from "./pages/logOut.js";

import CandidatesHomePage from "./pages/admin/candidates/candidates.tsx";
import AddStudentsCSVPage from "./pages/admin/students/addwithcsv/addStudents.tsx";
import AdminStudentLayout from "./pages/admin/students/layout.tsx";
import AddStudentPage from "./pages/admin/students/add/addStudent.tsx";
import AdminStudentHomePage from "./pages/admin/students/students.tsx";
import AdminClasseLayout from "./pages/admin/classes/layout.tsx";
import AdminClasseHomePage from "./pages/admin/classes/classes.tsx";
import AddClassePage from "./pages/admin/classes/add/addClass.tsx";
import EditStudentPage from "./pages/admin/students/edit/editStudent.tsx";
import EditClassePage from "./pages/admin/classes/edit/editClass.tsx";
import DeleteClassePage from "./pages/admin/classes/delete/deleteClass.tsx";
import DeleteStudentPage from "./pages/admin/students/delete/deleteStudent.tsx";
import AdminRoleLayout from "./pages/admin/roles/layout.tsx";
import AdminRoleHomePage from "./pages/admin/roles/roles.tsx";
import AddRolePage from "./pages/admin/roles/add/addRole.tsx";
import EditRolePage from "./pages/admin/roles/edit/editRole.tsx";
import DeleteRolePage from "./pages/admin/roles/delete/deleteRole.tsx";
import AdminResultsPage from "./pages/admin/results/results.tsx";
import OTPPage from "./pages/student/otp.tsx";
import StudentHomePage from "./pages/student/StudentHomePage.tsx";
import Home from "./pages/student/Home.tsx";
import Vote from "./pages/student/Vote.tsx";
import Candidature from "./pages/student/Candidature.tsx";
import Resultat from "./pages/student/Resultat.tsx";
import ChangeStatusCandidatesPage from "./pages/admin/candidates/changeStatus/changeStatus.tsx";
import AdminCandidatesLayout from "./pages/admin/candidates/layout.tsx";
import InfosCandidatesPage from "./pages/admin/candidates/infos/infos.tsx";
import AdminLoginPage from "./pages/admin/login.tsx";
import PlanningPage from "./pages/admin/planning/planning.tsx";
import PrivateRoute from "./pages/PrivateRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/adlogin",
    element: <AdminLoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/login/otp",
    element: <OTPPage />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <AdminPage />,
      },
      {
        path: "logout",
        element: <LogOut />,
      },
      {
        path: "planning",
        element: <PlanningPage />,
      },
      {
        path: "students",
        element: <AdminStudentLayout />,
        children: [
          {
            path: "",
            element: <AdminStudentHomePage />,
          },
          {
            path: "add",
            element: <AddStudentPage />,
          },
          {
            path: "import",
            element: <AddStudentsCSVPage />,
          },
          {
            path: "edit/:id",
            element: <EditStudentPage />,
          },
          {
            path: "delete/:id",
            element: <DeleteStudentPage />,
          },
        ],
      },
      {
        path: "classes",
        element: <AdminClasseLayout />,
        children: [
          {
            path: "",
            element: <AdminClasseHomePage />,
          },
          {
            path: "add",
            element: <AddClassePage />,
          },
          {
            path: "edit/:id",
            element: <EditClassePage />,
          },
          {
            path: "delete/:id",
            element: <DeleteClassePage />,
          },
        ],
      },
      {
        path: "roles",
        element: <AdminRoleLayout />,
        children: [
          {
            path: "",
            element: <AdminRoleHomePage />,
          },
          {
            path: "add",
            element: <AddRolePage />,
          },
          {
            path: "edit/:id",
            element: <EditRolePage />,
          },
          {
            path: "delete/:id",
            element: <DeleteRolePage />,
          },
        ],
      },
      {
        path: "candidates",
        element: <AdminCandidatesLayout />,
        children: [
          {
            path: "",
            element: <CandidatesHomePage />,
          },
          {
            path: ":id",
            element: <InfosCandidatesPage />,
          },
          {
            path: "changeStatus/:id",
            element: <ChangeStatusCandidatesPage />,
          },
        ],
      },
      {
        path: "results",
        element: <AdminResultsPage />,
      },
    ],
  },
  {
    path: "/student",
    element: (
      <PrivateRoute>
        <StudentHomePage />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "vote",
        element: <Vote />,
      },
      {
        path: "candidature",
        element: <Candidature />,
      },
      {
        path: "resultat",
        element: <Resultat />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
