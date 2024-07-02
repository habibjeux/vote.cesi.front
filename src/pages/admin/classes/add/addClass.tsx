import { FormEvent, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import Text from "../../../../components/ui/text";
import { Button } from "../../../../components/ui/button";
import { createClass } from "../../../../services/classes.service";
import axios from "axios";
export default function AddClassePage() {
  const [name, setName] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    setLoading(true);
    createClass(name!)
      .then(() => {
        setSuccess(true);
        setName("");
        setLoading(false);
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
  };

  return (
    <div>
      <Text variant="h1">Ajouter une classe</Text>
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
          <Badge
            className={`w-full mt-2 variant hidden ${
              error && "block"
            } variant='destructive'`}
          >
            {error}
          </Badge>
          <Badge
            className={`w-full mt-2 variant hidden ${
              success && "block"
            } variant='secondary'`}
          >
            Classe ajoutée avec succèss
          </Badge>
          <Button className="w-full mt-6 py-2">
            {!loading ? "Ajouter" : "Loading..."}
          </Button>
        </form>
      </div>
    </div>
  );
}
