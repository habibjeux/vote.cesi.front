import { FormEvent, useEffect, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import Text from "../../../../components/ui/text";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import {
  getClassById,
  updateClass,
} from "../../../../services/classes.service";
import axios from "axios";
export default function EditClassePage() {
  const classeId = useParams().id;
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateClassHandle(parseInt(classeId!), name);
  };

  const updateClassHandle = async (id: number, name: string) => {
    setLoading(true);
    try {
      await updateClass(id, name);
      setSuccess(true);
      setLoading(false);
      navigate("/admin/classes");
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

  const getClassByIdHandle = async (id: number) => {
    try {
      const data = await getClassById(id);
      setName(data.name);
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
      navigate("/admin/classes");
    }
  };

  useEffect(() => {
    getClassByIdHandle(parseInt(classeId!));
  }, []);
  return (
    <>
      {loadingPage ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Text variant="h1">Modifier une classe</Text>
          <div className="w-full">
            <form onSubmit={handleSubmit} className="border p-6 rounded-sm">
              <input
                className="mb-2 mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="className"
                type="text"
                placeholder="Entrer le nom de la classe"
                onChange={handleChange}
                value={name}
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
