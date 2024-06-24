import { useState } from "react";
import CESI from "../../assets/CESI.png";
import { Link, Outlet } from "react-router-dom";
function StudentHomePage() {
  const [count, setCount] = useState(0);

  return (
    <section className="h-screen">
      
      <header className="flex  justify-around items-center">
        <p>
          <img src={CESI} width={80} height={80} alt="Logo de CESI" />
        </p>
        <h1 className="text-3xl font-bold text-accents">Election CESI</h1>
        <nav>
          <ul className="flex gap-3 items-center">
            <li className="text-primary  font-bold">
              <Link to="/student">Home</Link>
            </li>
            <li className="text-primary  font-bold">
              <Link to="/student/vote">Vote</Link>
            </li>
            <li className="text-primary  font-bold">
              <Link to="/student/candidature">Candidature</Link>
            </li>
            <li className="text-primary  font-bold">
              <Link to="/student/resultat">Resultat</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
    </section>
  );
}

export default StudentHomePage;
