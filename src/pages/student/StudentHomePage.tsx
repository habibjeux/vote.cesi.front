import { useState, useEffect } from "react";
import CESI from "../../assets/CESI.png";
import { Link, Outlet } from "react-router-dom";
import useScreenSize from "./Hook/useScreenSize";
function StudentHomePage() {
  const [count, setCount] = useState(0);
  const studentId = 46884;
  const [student, setStudent] = useState(null);
  const windowSize = useScreenSize(); 
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/student/${studentId}`
        );
        const data = await response.json();
        setStudent(data);
        console.log("studentdjj:", data);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, []);

  return (
    <section className="h-screen">
      <header className="flex  justify-around items-center">
        <p>
          <img src={CESI} width={80} height={80} alt="Logo de CESI" />
        </p>
        <h1 className="text-3xl font-bold text-accents">
  {windowSize.width > 800 ? "Election CESI" : ""}
</h1>
        <nav>
          <ul className="flex gap-3 items-center">
            <li className="text-primary   text-lg font-bold">
              <Link to="/student">Home</Link>
            </li>
            <li className="text-primary text-lg font-bold">
              <Link to="/student/vote">Vote</Link>
            </li>
            <li className="text-primary  text-lg font-bold">
              <Link to="/student/candidature">Candidature</Link>
            </li>
            <li className="text-primary text-lg  font-bold">
              <Link to="/student/resultat">Resultat</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet context={{ student }} />
    </section>
  );
}

export default StudentHomePage;
