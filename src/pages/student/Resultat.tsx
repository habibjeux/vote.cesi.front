import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Poste from "./components/Poste";
import icone from "../../assets/icone_vote.png";
import resultat from "../../assets/resultatselections.png";
import ResultatVote from "./components/ResultatVote";
function Resultat() {
  const { student } = useOutletContext();
  const [postes, setPoste] = useState([]);
  const [selectedPosteId, setSelectedPosteId] = useState(null);
  const candidatVoteRef = useRef(null);

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
        candidatVoteRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [selectedPosteId]);

  const handlePosteClick = (id) => {
    console.log(`Poste cliqué : ${id}`);
    setSelectedPosteId(id);
  };
  console.log();
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex flex-col w-1/2 justify-center items-center">
          <img className="w-24" src={icone} alt="icone vote" />
          <p className="text-xl">Choisir la poste pour voir la resulat</p>
          {postes.map((unPoste) => (
            <Poste
              unPoste={unPoste}
              key={unPoste.id}
              onClick={handlePosteClick}
            />
          ))}
        </div>
        <img className="h-80" src={resultat} alt="visuel" />
      </div>
      {selectedPosteId && (
        <div
          className="flex justify-center flex-row flex-wrap"
          ref={candidatVoteRef}
        >
          <ResultatVote />
        </div>
      )}
    </div>
  );
}

export default Resultat;
