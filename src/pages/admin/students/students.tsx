import { CopyPlusIcon, PlusIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/data-table";
import Text from "../../../components/ui/text";
import { columns } from "./columns";
import axios from "axios";
import { useEffect, useState } from "react";
import { getStudents } from "../../../services/students.service";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../../components/ui/badge";
import { Student } from "../../../types/student.type";

export default function AdminStudentHomePage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  async function getStudentsHandler() {
    try {
      const data = await getStudents();
      setStudents(data);
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
      }
    }
  }

  useEffect(() => {
    getStudentsHandler();
  }, []);

  return (
    <div>
      <Text variant="h1">Etudiants</Text>
      <div className="flex justify-between">
        <Button
          className="mb-4 p-2 bg-primary text-white rounded-full shadow-lg"
          onClick={() => navigate("/admin/students/add")}
        >
          <PlusIcon />
          Ajouter un étudiant
        </Button>
        <Button
          className="mb-4 p-2 bg-primary text-white rounded-full shadow-lg"
          onClick={() => navigate("/admin/students/import")}
        >
          <CopyPlusIcon />
          Importer des étudiants (csv)
        </Button>
      </div>
      <DataTable columns={columns} data={students} />
      {error && (
        <Badge className="w-full mt-2" variant={"destructive"}>
          {error}
        </Badge>
      )}
    </div>
  );
}
