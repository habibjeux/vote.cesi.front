import { PlusIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/data-table";
import Text from "../../../components/ui/text";
import { useNavigate } from "react-router-dom";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { Badge } from "../../../components/ui/badge";
import { Role } from "../../../types/roles.type";
import { getAllRoles } from "../../../services/roles.service";

export default function AdminRoleHomePage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllRoles()
      .then((data) => {
        data.sort((a: Role, b: Role) => a.title.localeCompare(b.title));
        setRoles(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <Text variant="h1">Roles</Text>
      <div className="flex justify-between">
        <Button
          className="mb-4 p-2 bg-primary text-white rounded-full shadow-lg"
          onClick={() => navigate("/admin/roles/add")}
        >
          <PlusIcon />
          Ajouter un role
        </Button>
      </div>
      {roles && <DataTable columns={columns} data={roles} />}
      {error && (
        <Badge className="w-full mt-2" variant={"destructive"}>
          {error}
        </Badge>
      )}
    </div>
  );
}
