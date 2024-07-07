import Text from "../../../components/ui/text";
import { useEffect, useState } from "react";
import { Candidate } from "../../../types/candidates.type";
import { getCandidates } from "../../../services/candidates.service";
import axios from "axios";
import { DataTable } from "../../../components/ui/data-table";
import { columns } from "./columns";

export default function CandidatesHomePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const getCandidatesHandle = async () => {
    const response = await getCandidates();
    setCandidates(response);
    console.log(response);
  };

  useEffect(() => {
    try {
      setLoading(true);
      getCandidatesHandle();
      setLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ERR_NETWORK") {
          setError(
            "Impossible de se connecter au serveur. Vérifiez votre connexion internet ou contactez l'administrateur."
          );
        } else {
          setError(() => err.response?.data);
        }
      } else {
        setError(() => "Une erreur inattendue s'est produite.");
        console.error("Unexpected error:", error);
      }
    }
  }, []);
  return (
    <div>
      <Text variant="h1">Candidats</Text>
      {loading ? (
        <Text>Chargement...</Text>
      ) : (
        candidates && <DataTable columns={columns} data={candidates} />
      )}
    </div>
  );
}
