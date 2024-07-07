import  { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Poste from "./components/Poste";
import CandidatVote from "./components/CandidatVote";
import icone from "../../assets/icone_vote.png";
import visuel from "../../assets/visuel.png";
import useScreenSize from "./Hook/useScreenSize";
import { OutletContext } from "./type/Type";
interface PosteType {
  id: number;
  title: string;
}

function Vote() {
  const { student } = useOutletContext<OutletContext>();
  const [postes, setPoste] = useState<PosteType[]>([]);
  const [selectedPosteId, setSelectedPosteId] = useState<number | null>(null);
  const [selectedPosteName, setSelectedPosteName] = useState<string | null>(
    null
  );
  const candidatVoteRef = useRef<HTMLDivElement>(null);
  const windowSize = useScreenSize();

  const search = async () => {
    try {
      const response = await fetch("http://localhost:9090/roles");
      const data = await response.json();
      setPoste(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search();
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
          <p className="text-xl">Choisir la poste pour voter</p>
          {postes.map((unPoste) => (
            <Poste
              unPoste={unPoste}
              key={unPoste.id}
              onClick={() => handlePosteClick(unPoste.id, unPoste.title)}
            />
          ))}
           {windowSize.width > 800 && (
          <img className="h-72 mb-2" src={visuel} alt="visuel"  />
        )}
        </div>
        <div className="flex flex-col">
        <div className="flex flex-col items-center justify-center p-8 bg-blue-100 rounded-lg shadow-md max-w-lg mx-auto">
  <h1 className="text-3xl font-bold text-primary mb-4">Exercez votre droit de vote !</h1>
  <p className="text-lg text-blue-800 mb-6">
    Votre vote compte ! Participez à la construction de l'avenir de notre école. Chaque vote est important et votre voix mérite d'être entendue. Faites la différence en participant au processus électoral.
  </p>
  <p className="text-lg text-blue-800 mb-6">
    Voter est un droit et une responsabilité fondamentale. C’est votre opportunité de choisir les dirigeants qui vous représenteront et défendront vos intérêts. Ne manquez pas cette chance de vous exprimer !
  </p>
  <p className="text-lg text-blue-800 mb-6">
    Rendez-vous aux bureaux de vote aujourd'hui et faites entendre votre voix. Ensemble, nous pouvons créer un avenir meilleur pour notre communauté scolaire.
  </p>
  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
    Votez maintenant
  </button>
</div>

       
        </div>
        
      </div>
      {selectedPosteId && (
        <div
          className="flex justify-center flex-row  flex-wrap w-full items-center"
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
