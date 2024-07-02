import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../../../../components/ui/badge";
import axios from "axios";
import { deleteStudent } from "../../../../services/students.service";

export default function DeleteStudentPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const studentId = useParams().id;
  useEffect(() => {
    deleteStudent(parseInt(studentId!))
      .then(() => {
        setLoading(false);
        navigate("/admin/students");
      })
      .catch((err) => {
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
      });
  }, []);

  return (
    <>
      {loading && <div>Loading...</div>}
      <Badge
        className={`w-full mt-2 variant hidden ${
          error && "block"
        } variant='destructive'`}
      >
        {error}
      </Badge>
    </>
  );
}
