import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ImageDeco from "./components/ImageDeco";
import Poste from "./components/Poste";
import CandidatVote from "./components/CandidatVote";
import icone from "../../assets/icone_vote.png";

function Vote() {
  const { student } = useOutletContext();
  const [postes, setPoste] = useState([]);
  const [selectedPosteId, setSelectedPosteId] = useState(null);

  const search = async () => {
    try {
      const response = await fetch('http://localhost:9090/roles');
      const data = await response.json();
      setPoste(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search();
  }, []);

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
            <Poste unPoste={unPoste} key={unPoste.id} onClick={handlePosteClick} />
          ))}
        </div>
        <ImageDeco />
      </div>
      {selectedPosteId && (
          <CandidatVote student={student} idPoste={selectedPosteId}/>
      )}
    
    </div>
  );
}

export default Vote;
