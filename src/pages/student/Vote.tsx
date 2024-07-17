import { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Poste from "../../components/Poste";
import CandidatVote from "../../components/CandidatVote";
import icone from "../../assets/icone_vote.png";
import visuel from "../../assets/visuel.png";
import useScreenSize from "../../Hook/useScreenSize";
import { OutletContext } from "./type/Type";
import authHeader from "../../services/auth-header";
interface PosteType {
  id: number;
  title: string;
}
interface Planning {
  startDate: string;
  endDate: string;
}

function Vote() {
  const { student } = useOutletContext<OutletContext>();
  const [postes, setPoste] = useState<PosteType[]>([]);
  const [selectedPosteId, setSelectedPosteId] = useState<number | null>(null);
  const [isVotingTime, setIsVotingTime] = useState<boolean>(false);
  const [selectedPosteName, setSelectedPosteName] = useState<string | null>(
    null
  );
  const candidatVoteRef = useRef<HTMLDivElement>(null);
  const windowSize = useScreenSize();
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const checkVotingTime = async () => {
    try {
      const response = await fetch("http://localhost:9090/planning", {
        headers: authHeader(),
      });
      const planning: Planning = await response.json();
      const now = new Date();
      const startDate = new Date(planning.startDate);
      const endDate = new Date(planning.endDate);
      console.log(now + "now" + startDate + "startDate" + endDate + "endDate");
      console.log(now >= startDate && now <= endDate);
      setIsVotingTime(now >= startDate && now <= endDate);
    } catch (error) {
      setConnectionError(
        "Erreur de connexion au serveur. Veuillez réessayer plus tard."
      );
    }
  };
  const search = async () => {
    try {
      const response = await fetch("http://localhost:9090/roles", {
        headers: authHeader(),
      });
      const data = await response.json();
      setPoste(data);
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
    if (selectedPosteId) {
      setTimeout(() => {
        candidatVoteRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [selectedPosteId]);

  const handlePosteClick = (id: number, name: string) => {
    console.log(`Poste cliqué : ${id}`);
    setSelectedPosteId(id);
    setSelectedPosteName(name);
  };

  return (
    <div>
      <div className="flex justify-center items-start">
        <div className="flex flex-col w-1/2  items-center">
          <img className="w-24" src={icone} alt="icone vote" />
          <p className="text-2xl text-primary font-bold">
            Choisir la poste pour voter
          </p>
          {!isVotingTime && (
            <div
              className="flex items-center justify-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div className="text-xl">
                <span className="font-medium">Important!</span> Les votes sont
                fermes
              </div>
            </div>
          )}
          {connectionError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Erreur de connexion !</strong>
              <span className="block sm:inline"> {connectionError}</span>
            </div>
          )}
          {postes.map((unPoste) => (
            <Poste
              unPoste={unPoste}
              key={unPoste.id}
              onClick={() => handlePosteClick(unPoste.id, unPoste.title)}
            />
          ))}
          {windowSize.width > 800 && (
            <img className="h-72 mb-2" src={visuel} alt="visuel" />
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-center p-8 bg-blue-100 rounded-lg shadow-md max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-4">
              Exercez votre droit de vote !
            </h1>
            <p className="text-lg text-blue-800 mb-6">
              Votre vote compte ! Participez à la construction de l'avenir de
              notre école. Chaque vote est important et votre voix mérite d'être
              entendue. Faites la différence en participant au processus
              électoral.
            </p>
            <p className="text-lg text-blue-800 mb-6">
              Voter est un droit et une responsabilité fondamentale. C’est votre
              opportunité de choisir les dirigeants qui vous représenteront et
              défendront vos intérêts. Ne manquez pas cette chance de vous
              exprimer !
            </p>
            <p className="text-lg text-blue-800 mb-6">
              Faites entendre votre voix. Ensemble, nous pouvons créer un avenir
              meilleur pour notre communauté universitaire.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
              Votez maintenant
            </button>
          </div>
        </div>
      </div>
      {selectedPosteId && isVotingTime && (
        <div
          className="flex justify-center flex-row flex-wrap w-full items-center"
          ref={candidatVoteRef}
        >
          <CandidatVote
            student={student}
            idPoste={selectedPosteId}
            name={selectedPosteName || ""}
          />
        </div>
      )}
    </div>
  );
}

export default Vote;
