import { useState } from "react";

import { Link, Outlet } from "react-router-dom";
function StudentHomePage() {
  const [count, setCount] = useState(0);

  return (
    <section className="h-screen">
      <header className="flex justify-between px-32 items-center bg-sky-700 h-10 text-white">
        <div>Club CESI </div>
        <nav>
          <ul className="flex gap-3 items-center">
            <li className="text-white">
              <Link to="/student">Home</Link>
            </li>
            <li className="text-white">
              <Link to="/student/vote">Vote</Link>
            </li>
            <li className="text-white">
              <Link to="/student/candidature">Candidature</Link>
            </li>
            <li className="text-white">
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
