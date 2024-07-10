import { useParams } from "react-router-dom";
import Text from "../../../../components/ui/text";
import { useEffect, useState } from "react";
import { getCandidateById } from "../../../../services/candidates.service";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";

import axios from "axios";
import { Candidate } from "../../../../types/candidates.type";
import { set } from "react-hook-form";
export default function InfosCandidatesPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    getCandidateByIdHandle();
    setLoading(false);
  }, []);

  const getCandidateByIdHandle = async () => {
    try {
      const response = await getCandidateById(parseInt(id!));
      setCandidate(response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ERR_NETWORK") {
          setError(
            "Impossible de se connecter au serveur. Vérifiez votre connexion internet ou contactez l'administrateur."
          );
        } else {
          setError(err.response?.data);
        }
      } else {
        setError(() => "Une erreur inattendue s'est produite.");
        console.error("Unexpected error:", error);
      }
      setLoading(false);
    }
  };
  return (
    <div>
      <Text variant="h1">Infos Candidats</Text>
      {loading ? (
        <div>Chargement...</div>
      ) : error ? (
        <div>Erreur: {error}</div>
      ) : (
        <div>
          <div>
            <Avatar>
              <AvatarImage src={candidate?.photoURL} />
              <AvatarFallback>
                {candidate?.student.firstName.charAt(0)}
                {candidate?.student.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
}
