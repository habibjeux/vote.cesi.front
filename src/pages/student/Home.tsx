import { Link } from "react-router-dom";
import ImageDeco from "../../components/ImageDeco";
import icone from "../../assets/icone_vote.png";
import useScreenSize from "../../Hook/useScreenSize";
import { useState, useEffect } from "react";

function Home() {
  const windowSize = useScreenSize();
  const [voteTime, setVoteTime] = useState<string | null>(null);
  const [isVotingOpen, setIsVotingOpen] = useState<boolean>(false);
  const [isDatePassed, setIsDatePassed] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string | null>(null);

  useEffect(() => {
    fetchVoteDate();
    fetchStudentName();
  }, []);

  const fetchVoteDate = async () => {
    try {
      const response = await fetch("http://localhost:9090/planning");
      const data = await response.json();
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatTime(endDate); // Utiliser formatTime pour l'heure seulement
      setVoteTime(`Le vote aura lieu le ${formattedStartDate} à ${formattedEndDate}`);

      const now = new Date();
      setIsVotingOpen(now >= startDate && now <= endDate);
      setIsDatePassed(now > endDate); // Vérifier si la date est passée
    } catch (error) {
      console.error("Erreur lors de la récupération de la date du vote:", error);
      setVoteTime("Erreur lors de la récupération de la date du vote");
    }
  };

  const fetchStudentName = () => {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) {
      const student = JSON.parse(storedStudent);
      setStudentName(`${student.firstName} ${student.lastName}`);
    }
  };

  const formatDate = (date: Date): string => {
    const day = date.toLocaleString("fr-FR", { day: "2-digit" });
    const month = date.toLocaleString("fr-FR", { month: "2-digit" });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="flex justify-center">
      {windowSize.width > 800 ? <ImageDeco /> : <div></div>}
      <div className="flex flex-col justify-center items-center w-1/2 font-bold text-lg">
      {studentName && <p className="my-2 text-primary">Bonjour, {studentName}</p>}
        <p className="my-2 text-primary">Bienvenue dans votre espace de vote électronique</p>
       
        <div
          className={`p-4 mb-4 text-sm rounded-lg ${
            isVotingOpen ? "bg-green-50 text-green-800" : isDatePassed ? "bg-red-50 text-red-800" : "bg-yellow-50 text-yellow-800"
          } dark:bg-gray-800 dark:text-yellow-300`}
          role="alert"
        >
          <span className="font-medium">Important!</span> {voteTime}
        </div>
        {isVotingOpen && (
          <Link
            to="/student/vote"
            className="select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Procéder au vote
          </Link>
        )}
        {!isVotingOpen && !isDatePassed && (
          <button
            className="select-none rounded-lg bg-gray-300 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-600 shadow-md shadow-gray-300/20 transition-all cursor-not-allowed"
            disabled
          >
            Attendez la date du vote
          </button>
        )}
        {!isVotingOpen && isDatePassed && (
          <button
            className="select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          >
            Voir les résultats
          </button>
        )}
        <img className=" " src={icone} alt="icone vote" />
      </div>
    </div>
  );
}

export default Home;
