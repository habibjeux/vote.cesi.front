import { FormEvent, useEffect, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import Text from "../../../../components/ui/text";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import axios from "axios";
import { getRoleById, updateRole } from "../../../../services/roles.service";
export default function EditRolePage() {
  const roleId = useParams().id;
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateRoleHandle(parseInt(roleId!), title);
  };

  const updateRoleHandle = async (id: number, title: string) => {
    setLoading(true);
    try {
      await updateRole(id, title);
      setLoading(false);
      navigate("/admin/roles");
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
        setError("Une erreur inattendue s'est produite.");
      }
      setLoading(false);
    }
  };

  const getRoleByIdHandle = async (id: number) => {
    try {
      const data = await getRoleById(id);
      setTitle(data.title);
      console.log(data);
      setLoadingPage(false);
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
        setError("Une erreur inattendue s'est produite.");
      }
      setLoadingPage(false);
      navigate("/admin/roles");
    }
  };

  useEffect(() => {
    getRoleByIdHandle(parseInt(roleId!));
  }, []);
  return (
    <>
      {loadingPage ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Text variant="h1">Modifier un rôle</Text>
          <div className="w-full">
            <form onSubmit={handleSubmit} className="border p-6 rounded-sm">
              <input
                className="mb-2 mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="classtitle"
                type="text"
                placeholder="Entrer le nom du rôle"
                onChange={handleChange}
                value={title}
              />
              {error && (
                <Badge className="w-full mt-2" variant={"destructive"}>
                  {error}
                </Badge>
              )}
              <Button className="w-full mt-6 py-2">
                {!loading ? "Modifier" : "Loading..."}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
