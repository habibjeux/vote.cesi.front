import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { changeStatus } from "../../../../services/candidates.service";

export default function ChangeStatusCandidatesPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const studentId = useParams().id;
  useEffect(() => {
    changeStatusHandle(parseInt(studentId!));
  }, []);

  const changeStatusHandle = async (id: number) => {
    try {
      await changeStatus(id);
      setLoading(false);
      navigate("/admin/candidates");
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
    <>
      {loading && <div>Loading...</div>}
      <Badge
        className={`w-full mt-2 variant hidden  ${
          error && "block"
        } variant='destructive'`}
      >
        {error}
      </Badge>
    </>
  );
}
