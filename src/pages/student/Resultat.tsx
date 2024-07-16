import { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Poste from "../../components/Poste";
import icone from "../../assets/icone_vote.png";
import resultat from "../../assets/resultatselections.png";
import ResultatVote from "../../components/ResultatVote";
import useScreenSize from "../../Hook/useScreenSize";

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
interface Planning {
  startDate: string;
  endDate: string;
}

function Resultat() {
  const { student } = useOutletContext<{ student: Student }>();
  const [postes, setPoste] = useState<Poste[]>([]);
  const [selectedPosteId, setSelectedPosteId] = useState<number | null>(null);
  const candidatVoteRef = useRef<HTMLDivElement>(null);
  const windowSize = useScreenSize();
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isVotingEnded, setIsVotingEnded] = useState<boolean>(false);

  const search = async () => {
    try {
      const response = await fetch("http://localhost:9090/roles");
      const data = await response.json();
      setPoste(data);
    } catch (error) {
      setConnectionError(
        "Erreur de connexion au serveur. Veuillez réessayer plus tard."
      );
    }
  };
  const checkVotingTime = async () => {
    try {
      const response = await fetch("http://localhost:9090/planning");
      const planning: Planning = await response.json();
      const now = new Date();
      const endDate = new Date(planning.endDate);
      setIsVotingEnded(now > endDate);
    } catch (error) {
      setConnectionError(
        "Erreur de connexion au serveur. Veuillez réessayer plus tard."
      );
    }
  };


  useEffect(() => {
    search();
    checkVotingTime();
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
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Erreur de connexion !</strong>
              <span className="block sm:inline"> {connectionError}</span>
            </div>
          )}
        </div>
        {windowSize.width > 800 && (
          <img className="h-80" src={resultat} alt="visuel" />
        )}
      </div>
      {selectedPosteId !== null && isVotingEnded && (
        <div
          className="flex flex-col justify-center items-center"
          ref={candidatVoteRef}
        >
          <p className="font-bold text-4xl text-primary">Resultat du vote</p>
          <ResultatVote idPoste={selectedPosteId} />
        </div>
      )}
      {selectedPosteId !== null && !isVotingEnded && (
        <div className="flex items-center justify-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">Info</span>
        <div className="text-xl">
          <span className="font-medium">Info!</span> Les résultats ne sont pas encore disponibles. Le vote est toujours en cours.
        </div>
      </div>
      )}
    </div>
  );
}

export default Resultat;
