import { useEffect, useState, useRef } from "react";
import Poste from "../../../components/Poste";
import icone from "../../../assets/icone_vote.png";
import ResultatVote from "../../../components/ResultatVote";
import Text from "../../../components/ui/text";
import authHeader from "../../../services/auth-header";
interface Poste {
  id: number;
  title: string;
}

export default function AdminResultsPage() {
  const [postes, setPoste] = useState<Poste[]>([]);
  const [selectedPosteId, setSelectedPosteId] = useState<number | null>(null);
  const candidatVoteRef = useRef<HTMLDivElement>(null);
  const search = async () => {
    try {
      const response = await fetch("http://localhost:9090/roles", {
        headers: authHeader(),
      });
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
    if (selectedPosteId && candidatVoteRef.current) {
      setTimeout(() => {
        candidatVoteRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [selectedPosteId]);

  const handlePosteClick = (id: number) => {
    console.log(`Poste cliqué : ${id}`);
    setSelectedPosteId(id);
  };

  return (
    <div className="">
      <Text variant="h1">Résultats</Text>
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
        </div>
      </div>
      {selectedPosteId !== null && (
        <div
          className="flex  flex-col justify-center items-center"
          ref={candidatVoteRef}
        >
          <ResultatVote idPoste={selectedPosteId} />
        </div>
      )}
    </div>
  );
}
