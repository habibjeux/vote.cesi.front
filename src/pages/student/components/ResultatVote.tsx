import React, { useEffect, useState } from "react";
import { Candidate, VoteResult } from "../type/Type"; // Assurez-vous de définir le chemin correct vers vos interfaces

interface ResultatVoteProps {
  idPoste: number;
}

const ResultatVote: React.FC<ResultatVoteProps> = ({ idPoste }) => {
  const [results, setResults] = useState<VoteResult[]>([]);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:9090/vote/count-by-candidate/${idPoste}`)
      .then((response) => response.json())
      .then((data: [number, Candidate, number][]) => {
        const formattedData: VoteResult[] = data.map((item) => ({
          candidateId: item[0],
          candidate: item[1],
          voteCount: item[2],
        }));
        setResults(formattedData);
        setConnectionError(null)
      })
      .catch((error) =>  setConnectionError("Erreur de connexion au serveur. Veuillez réessayer plus tard."));
  }, [idPoste]);

  return (
    <div className="p-6 bg-blue-100 w-2/3">
       {connectionError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Erreur de connexion !</strong>
          <span className="block sm:inline"> {connectionError}</span>
        </div>
      )}
      {results.length > 0 && connectionError!=="Erreur de connexion au serveur. Veuillez réessayer plus tard." ? (
        <div className="space-y-4">
          {results.map(({ candidateId, candidate, voteCount }) => (
            <div key={candidateId} className="p-4 bg-white rounded shadow">
              <div className="flex items-center">
                {candidate?.photoURL ? (
                  <img
                    src={candidate.photoURL}
                    alt={`${candidate.student.firstName} ${candidate.student.lastName}`}
                    className="w-16 h-20 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-20 rounded-full bg-gray-200" />
                )}
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">
                    {candidate?.student.firstName} {candidate?.student.lastName}
                  </h2>
                  <p className="text-gray-600">Votes:<span className=" text-green-700 font-bold text-2xl mx-1">{voteCount}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-red-500   font-bold">Le resultats pour ce post ne sont pas encore disponibles.</p>
      )}
    </div>
  );
};

export default ResultatVote;
