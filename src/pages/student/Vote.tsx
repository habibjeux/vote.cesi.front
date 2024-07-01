import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Poste from "./components/Poste";
import CandidatVote from "./components/CandidatVote";
import icone from "../../assets/icone_vote.png";
import visuel from "../../assets/visuel.png";
import useScreenSize from "./Hook/useScreenSize";

function Vote() {
  const { student } = useOutletContext();
  const [postes, setPoste] = useState([]);
  const [selectedPosteId, setSelectedPosteId] = useState(null);
  const candidatVoteRef = useRef(null);
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
        candidatVoteRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [selectedPosteId]);

  const handlePosteClick = (id) => {
    console.log(`Poste cliqué : ${id}`);
    setSelectedPosteId(id);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex flex-col w-1/2 justify-center items-center">
          <img className="w-24" src={icone} alt="icone vote" />
          <p className="text-xl">Choisir la poste pour voter</p>
          {postes.map((unPoste) => (
            <Poste
              unPoste={unPoste}
              key={unPoste.id}
              onClick={handlePosteClick}
            />
          ))}
        </div>{" "}
        {windowSize.width > 800 && (
          <img className="h-80" src={visuel} alt="visuel" />
        )}
      </div>
      {selectedPosteId && (
        <div
          className="flex justify-center flex-row  flex-wrap w-full items-center"
          ref={candidatVoteRef}
        >
          <CandidatVote student={student} idPoste={selectedPosteId} />
        </div>
      )}
    </div>
  );
}

export default Vote;
