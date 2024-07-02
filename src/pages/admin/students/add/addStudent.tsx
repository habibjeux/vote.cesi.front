import { FormEvent, useEffect, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import Text from "../../../../components/ui/text";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { getAllClasses } from "../../../../services/classes.service";
import { Classe } from "../../../../types/classe.type";
import axios from "axios";
import { addStudent } from "../../../../services/students.service";
import { Student } from "../../../../types/student.type";
export default function AddStudentPage() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<Classe[]>([]);
  const [student, setStudent] = useState<Student>({
    id: 0,
    nce: "",
    firstName: "",
    lastName: "",
    email: "",
    className: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [errorNoClasse, setErrorNoClasse] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    addStudentHandler();
    setLoading(false);
  };
  useEffect(() => {
    getAllClassesHandler();
  }, []);

  const getAllClassesHandler = async () => {
    try {
      const data = await getAllClasses();
      if (data.length === 0) {
        setErrorNoClasse(
          "Aucune classe n'est disponible. Veuillez en ajouter une avant d'ajouter un étudiant."
        );
        setLoadingPage(false);
        return;
      }
      data.sort((a: Classe, b: Classe) => a.name.localeCompare(b.name));
      setStudent((prev) => ({ ...prev, className: data[0].name }));
      setClasses(data);
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
        setError(() => "Une erreur inattendue s'est produite.");
        console.error("Unexpected error:", error);
      }
      setLoading(false);
      setLoadingPage(false);
    }
  };

  const addStudentHandler = async () => {
    try {
      const data = await addStudent(student);
      console.log(data);
      navigate("/admin/students");
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
      setLoading(false);
    }
  };
  return (
    <>
      {loadingPage ? (
        <div>Loading...</div>
      ) : errorNoClasse ? (
        <Badge className="w-full mt-2" variant={"destructive"}>
          {errorNoClasse}
        </Badge>
      ) : (
        <div>
          <Text variant="h1">Ajouter un étudiant</Text>
          <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className="border p-6 rounded-sm">
              <input
                className="mb-2 mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="nce"
                type="text"
                placeholder="Entrer votre NCE"
                onChange={handleChange}
                value={student.nce}
              />
              <input
                className="mb-2 mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="firstName"
                type="text"
                placeholder="Entrer votre prénom"
                onChange={handleChange}
                value={student.firstName}
              />
              <input
                className="mb-2 mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="lastName"
                type="text"
                placeholder="Entrer votre nom"
                onChange={handleChange}
                value={student.lastName}
              />
              <input
                className="mb-2 mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                type="email"
                placeholder="Entrer votre email"
                onChange={handleChange}
                value={student.email}
              />
              <select
                name="className"
                onChange={handleChange}
                value={student.className}
                className="mb-2 mt-4 hover:cursor-pointer shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {classes.map((classe) => (
                  <option key={classe.id} value={classe.name}>
                    {classe.name}
                  </option>
                ))}
              </select>
              {error && (
                <Badge className="w-full mt-2" variant={"destructive"}>
                  {error}
                </Badge>
              )}
              <Button className="w-full mt-6 py-2">
                {!loading ? "Ajouter" : "Loading..."}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
