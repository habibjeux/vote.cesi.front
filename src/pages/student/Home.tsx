
import { Link } from "react-router-dom";
import ImageDeco from "./components/ImageDeco";
import icone from "../../assets/icone_vote.png";
import useScreenSize from "./Hook/useScreenSize";
import { useState } from "react";

function Home() {
  const windowSize = useScreenSize(); 
  const [connectionError, setConnectionError] = useState<string | null>(null);
  return (
    <div className="flex  justify-center">
      {windowSize.width > 800 ? <ImageDeco /> : <div></div>}
      <div className="flex flex-col justify-center items-center w-1/2 font-bold text-lg">
        <p className="my-2">Bienvenue dans votre espace de vote électronique</p>
        <div
          className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          <span className="font-medium">important!</span> le vote se déroulera le 29
          juin de 9h à 18h.
        </div>
        <Link
          to="/student/vote"
          className="select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Procéder au vote
        </Link>
        <img className=" " src={icone} alt="icone vote" />
      </div>
    </div>
  );
}

export default Home;
