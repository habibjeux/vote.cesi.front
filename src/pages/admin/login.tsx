import { useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { AdminCredentials } from "../../types/auth.type";
import { loginAdmin } from "../../services/login.service";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Student } from "../../types/student.type";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [credentiels, setCredentials] = useState<AdminCredentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response: Student = await loginAdmin(credentiels);
      return navigate("/admin", { state: { user: response } });
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
      setLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen flex  justify-center items-center">
      <form onSubmit={handleSubmit} className="border w-[318px] p-6 rounded-sm">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 mt-4"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Entrer votre email"
          onChange={handleChange}
          value={credentiels.email}
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Mot de passe
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Entrer votre mot de passe"
          onChange={handleChange}
          value={credentiels.password}
        />
        <Badge
          className={`w-full mt-2 variant hidden ${error && "block"}`}
          variant={"destructive"}
        >
          {error}
        </Badge>
        <Button className="w-full mt-6 py-2">
          {!loading ? "S'identifier" : "Loading..."}
        </Button>
      </form>
    </div>
  );
}
