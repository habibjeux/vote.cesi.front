import  { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Poste from "./components/Poste";
import icone from "../../assets/icone_vote.png";
import resultat from "../../assets/resultatselections.png";
import ResultatVote from "./components/ResultatVote";
import useScreenSize from "./Hook/useScreenSize";

interface Student {
  id: number;
  nce: string;
  firstName: string;
  lastName: string;
  email: string;
  class_id: number | null;
}

interface Poste {
  id: number;
  title: string;
}

function Resultat() {
  const { student } = useOutletContext<{ student: Student }>();
  const [postes, setPoste] = useState<Poste[]>([]);
  const [selectedPosteId, setSelectedPosteId] = useState<number | null>(null);
  const candidatVoteRef = useRef<HTMLDivElement>(null);
  const windowSize = useScreenSize();
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const search = async () => {
    try {
      const response = await fetch("http://localhost:9090/roles");
      const data = await response.json();
      setPoste(data);
    } catch (error) {
      setConnectionError("Erreur de connexion au serveur. Veuillez réessayer plus tard.");
    }
  };

  useEffect(() => {
    search();
  }, []);

  useEffect(() => {
    if (selectedPosteId && candidatVoteRef.current) {
      setTimeout(() => {
        candidatVoteRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [selectedPosteId]);

  const handlePosteClick = (id: number) => {
    setConnectionError(null);
    setSelectedPosteId(id);
  };

  return (
    <div className="">
      <div className="flex justify-center items-center">
        <div className="flex flex-col w-1/2 justify-center items-center">
          <img className="w-24" src={icone} alt="icone vote" />
          <p className="text-xl">Choisir la poste pour voir la resulat</p>
          {postes.map((unPoste) => (
            <Poste
              unPoste={unPoste}
              key={unPoste.id}
              onClick={() => handlePosteClick(unPoste.id)}
            />
            
          ))}
            {connectionError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Erreur de connexion !</strong>
          <span className="block sm:inline"> {connectionError}</span>
        </div>
      )}
        </div>
        {windowSize.width > 800 && (
          <img className="h-80" src={resultat} alt="visuel" />
        )}
      </div>
      {selectedPosteId !== null && (
        <div
          className="flex  flex-col justify-center items-center"
          ref={candidatVoteRef}
        >
          <p className=" font-bold text-4xl text-primary">Resultat du vote</p>
          <ResultatVote idPoste={selectedPosteId} />
        </div>
      )}
    </div>
  );
}

export default Resultat;
