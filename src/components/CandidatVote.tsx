import React, { useEffect, useState } from "react";
import { Candidate, Student } from "../pages/student/type/Type";
import authHeader from "../services/auth-header";

interface CandidatVoteProps {
  student: Student;
  idPoste: number;
  name: string;
}

const CandidatVote: React.FC<CandidatVoteProps> = ({
  student,
  idPoste,
  name,
}) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [voteCandidateId, setVoteCandidateId] = useState<number | null>(null);
  const [isStudentVotedRole, setIsStudentVotedRole] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const fetchCandidates = async () => {
    try {
      const response = await fetch(
        `http://localhost:9090/cesi/role/${idPoste}`,
        { headers: authHeader() }
      );
      const data: Candidate[] = await response.json();
      setCandidates(data);
      setIsStudentVotedRole(false);
    } catch (error) {
      setConnectionError(
        "Erreur de connexion au serveur. Veuillez réessayer plus tard."
      );
    }
  };

  const handleVote = async () => {
    if (voteCandidateId === null) return;

    try {
      const response = await fetch("http://localhost:9090/vote", {
        method: "POST",
        headers: {
          ...authHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: student.id,
          candidateId: voteCandidateId,
          voteDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Vous avez déjà voté pour ce poste.");
      }

      const result = await response.json();
      console.log("Vote successful:", result);
      setModalTitle("Information");
      setModalContent("Votre vote a été pris en compte.");
    } catch (error) {
      setConnectionError("Vous avez déjà voté pour ce poste.");
      setModalTitle("Erreur");
      setModalContent("Vous avez déjà voté pour ce poste.");
    } finally {
      setShowModal(true);
    }
  };

  const handleShowProgram = (program: string) => {
    setModalTitle("Programme du candidat");
    setModalContent(program);
    setShowModal(true);
  };

  const confirmVote = (candidateId: number) => {
    setVoteCandidateId(candidateId);
    setModalTitle("Confirmation de vote");
    setModalContent("Êtes-vous sûr de vouloir voter pour ce candidat?");
    setShowModal(true);
  };

  useEffect(() => {
    fetchCandidates();
  }, [idPoste]);

  return (
    <div className="bg-blue-100 w-11/12 rounded-lg">
      <p className="font-bold text-4xl text-primary text-center my-2">
        Vote poste {name}
      </p>
      {connectionError && (
        <div
          className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline"> {connectionError}</span>
        </div>
      )}
      {isStudentVotedRole && (
        <div className="bg-red-200 text-red-700 text-center p-4 mb-4 rounded-lg">
          Vous avez déjà voté pour ce poste.
        </div>
      )}
      <div className="flex flex-row flex-wrap justify-center">
        {!isStudentVotedRole &&
          candidates.map((unCandidat) => (
            <div
              key={unCandidat.id}
              className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark w-80 mx-2"
            >
              <div
                className="relative overflow-hidden bg-cover bg-no-repeat"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                <img
                  className="rounded-t-lg w-full"
                  src={unCandidat.photoURL}
                  alt="image candidat"
                />
              </div>
              <div className="p-6 text-surface dark:text-white">
                <h5 className="mb-2 text-xl font-medium leading-tight">
                  {unCandidat.student.firstName} {unCandidat.student.lastName}
                </h5>
                <button
                  type="button"
                  onClick={() => handleShowProgram(unCandidat.program)}
                  className="my-3 inline-block rounded bg-gray-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  Afficher le programme
                </button>
                <button
                  type="button"
                  onClick={() => confirmVote(unCandidat.id)}
                  className="inline-block rounded bg-green-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  Voter
                </button>
              </div>
            </div>
          ))}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg z-10">
              <h3 className="text-xl font-bold mb-4">{modalTitle}</h3>
              <p>{modalContent}</p>
              <div className="mt-4 flex justify-end">
                {modalTitle === "Confirmation de vote" ? (
                  <>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                      onClick={() => setShowModal(false)}
                    >
                      Annuler
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => {
                        setShowModal(false);
                        handleVote();
                      }}
                    >
                      Confirmer
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => setShowModal(false)}
                  >
                    Fermer
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidatVote;
