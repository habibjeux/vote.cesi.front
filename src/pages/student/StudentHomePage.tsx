import { useState, useEffect } from "react";
import { useLocation, Link, Outlet, useNavigate } from "react-router-dom";

import CESI from "../../assets/CESI.png";
import useScreenSize from "./Hook/useScreenSize";
import { Student } from "../../types/student.type";

function StudentHomePage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const studentId = 2;
  const [student, setStudent] = useState(null);
  const windowSize = useScreenSize();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!studentId) navigate("/login");
    const fetchStudent = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/student/${studentId}`
        );
        const data = await response.json();
        setStudent(data);
        console.log("student:", data);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, []);

  return (
    <section className="h-screen">
      <header className="flex justify-around items-center">
        <p>
          <img src={CESI} width={80} height={80} alt="Logo de CESI" />
        </p>
        <h1 className="text-3xl font-bold text-accents">
          {windowSize.width > 800 ? "Election CESI" : ""}
        </h1>
        {windowSize.width > 800 ? (
          <nav>
            <ul className="flex gap-3 items-center">
              <li className="text-primary text-lg font-bold">
                <Link to="/student">Home</Link>
              </li>
              <li className="text-primary text-lg font-bold">
                <Link to="/student/vote">Vote</Link>
              </li>
              <li className="text-primary text-lg font-bold">
                <Link to="/student/candidature">Candidature</Link>
              </li>
              <li className="text-primary text-lg font-bold">
                <Link to="/student/resultat">Resultat</Link>
              </li>
            </ul>
          </nav>
        ) : (
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl">
                <Link
                  to="/student"
                  className="block px-4 py-2 text-primary text-lg font-bold"
                >
                  Home
                </Link>
                <Link
                  to="/student/vote"
                  className="block px-4 py-2 text-primary text-lg font-bold"
                >
                  Vote
                </Link>
                <Link
                  to="/student/candidature"
                  className="block px-4 py-2 text-primary text-lg font-bold"
                >
                  Candidature
                </Link>
                <Link
                  to="/student/resultat"
                  className="block px-4 py-2 text-primary text-lg font-bold"
                >
                  Resultat
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      <Outlet context={{ student }} />
    </section>
  );
}

export default StudentHomePage;
