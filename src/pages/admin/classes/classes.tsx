import { PlusIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/data-table";
import Text from "../../../components/ui/text";
import { useNavigate } from "react-router-dom";
import { columns } from "./columns";
import { getAllClasses } from "../../../services/classes.service";
import { useEffect, useState } from "react";
import { Classe } from "../../../types/classe.type";
import { Badge } from "../../../components/ui/badge";

export default function AdminClasseHomePage() {
  const [classes, setClasses] = useState<Classe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllClasses()
      .then((data) => {
        data.sort((a: Classe, b: Classe) => a.name.localeCompare(b.name));
        setClasses(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <Text variant="h1">Classes</Text>
      <div className="flex justify-between">
        <Button
          className="mb-4 p-2 bg-primary text-white rounded-full shadow-lg"
          onClick={() => navigate("/admin/classes/add")}
        >
          <PlusIcon />
          Ajouter une classe
        </Button>
      </div>
      {classes && <DataTable columns={columns} data={classes} />}
      {error && (
        <Badge className="w-full mt-2" variant={"destructive"}>
          {error}
        </Badge>
      )}
    </div>
  );
}
