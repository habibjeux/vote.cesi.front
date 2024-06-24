import React from "react";
import { Link } from "react-router-dom";

import ImageDeco from "./components/ImageDeco";
import icone from "../../assets/icone_vote.png";
function Home() {
  return (
    <div className="flex">
      <ImageDeco />
      <div className="flex flex-col justify-center items-center w-1/2  font-bold text-lg">
        <p className="my-2">Bienvenue dans votre espace de vote electronique</p>
        <div
          className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          <span className="font-medium">important!</span> le vote se deroulra le 29
          juin de 9h a 18h.
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
