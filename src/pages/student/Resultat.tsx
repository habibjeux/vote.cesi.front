import React, { useEffect, useState, useRef } from "react";
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
