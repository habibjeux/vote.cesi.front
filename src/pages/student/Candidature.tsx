import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import icone from "../../assets/icone_vote.png";
import ImageDeco from "../../components/ImageDeco";
import { Candidate, CandidateResponse, Role, Student } from "./type/Type";

interface FormData {
  roleId: number;
  photo: File[];
  program: string;
}

function Candidature() {
  const { student } = useOutletContext<{ student: Student }>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [candidate, setCandidate] = useState<Candidate[]>([]);
  const [candidateResponse, setCandidateResponses] =
    useState<CandidateResponse>();
  const [studentCurrent, setRoleStudentCurrent] = useState<Student | null>(
    student
  );

  async function miseAJour() {
    try {
      const candidateResponse = await fetch(
        `http://localhost:9090/cesi/student/${student?.nce}`
      );
      const dataCandidat = await candidateResponse.json();
      setCandidate(dataCandidat);
      setCandidateResponses(dataCandidat);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du candidat:", error);
    }
  }
  const cancelCandidatClick = async (idCandidat: number) => {
    try {
      const response = await fetch(`http://localhost:9090/cesi/${idCandidat}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la candidature");
      }

      miseAJour();
    } catch (error) {
      console.error("Erreur lors de l'annulation de la candidature:", error);
    }
  };
  useEffect(() => {
    const fetchRoles = async () => {
      if (!student) return;

      try {
        const response = await fetch("http://localhost:9090/roles");
        const candidateResponse = await fetch(
          `http://localhost:9090/cesi/student/${student.nce}`
        );
        const data = await response.json();
        const dataCandidat = await candidateResponse.json();

        setCandidateResponses(dataCandidat);
        console.log(candidateResponse);

        setRoles(data);
        setCandidate(dataCandidat);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchRoles();
  }, [student]);

  useEffect(() => {
    if (student) {
      localStorage.setItem("student", JSON.stringify(student));
    }
  }, [student]);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("student_id", String(student?.id));
    formData.append("role_id", String(data.roleId));
    formData.append("program", data.program);
    formData.append("photo", data.photo[0]);

    try {
      const response = await fetch("http://localhost:9090/cesi/candidates", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          "Erreur soumission " + (errorData.message || "Unknown error")
        );
      }

      setSubmitSuccess("Votre candidature est soumise avec succès");
      setSubmitError(null);
      reset();
      miseAJour();
    } catch (error) {
      setSubmitError("une erreur s'est produite veuillez ressayer");
      setSubmitSuccess(null);
    }
  };

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("student") || "{}");
    if (storedStudent) {
      setRoleStudentCurrent(storedStudent);
    }
  }, []);

  return (
    <div className="flex">
      <ImageDeco />

      {candidateResponse?.status === "success" ? (
        <div className="mx-auto flex flex-col justify-center items-center">
          <img className="w-24" src={icone} alt="icone vote" />
          <p className="text-green-600 text-xl font-bold my-2">
            Veuillez remplir le formulaire pour candidater à un poste!
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-300 p-8 rounded-lg shadow-lg w-96"
            encType="multipart/form-data"
          >
            <div className="form-group flex flex-col mb-4">
              <label className="text-blue-600">Role</label>
              <select
                {...register("roleId", { required: "Role is required" })}
                className="p-4 rounded-lg"
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.title}
                  </option>
                ))}
              </select>
              {errors.roleId && (
                <span className="text-red-500">{errors.roleId.message}</span>
              )}
            </div>
            <div className="form-group flex flex-col mb-4">
              <label className="text-blue-600">Photo</label>
              <input
                type="file"
                {...register("photo", { required: "Photo is required" })}
                className="p-4 rounded-lg"
              />
              {errors.photo && (
                <span className="text-red-500">{errors.photo.message}</span>
              )}
            </div>
            <div className="form-group flex flex-col mb-4">
              <label className="text-blue-600">Program</label>
              <textarea
                {...register("program", { required: "Program is required" })}
                className="p-4 rounded-lg"
                rows={5}
              />
              {errors.program && (
                <span className="text-red-500">{errors.program.message}</span>
              )}
            </div>
            <div className="form-group flex flex-col mb-4">
              <button type="submit" className="bg-green-400 p-2 rounded-lg">
                Submit Candidate
              </button>
            </div>
            {submitError && <div className="text-red-500">{submitError}</div>}
            {submitSuccess && (
              <div className="text-green-500">{submitSuccess}</div>
            )}
          </form>
        </div>
      ) : (
        <div>
          <div
            className="  m-14 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md h-24"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-teal-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">
                  Impossible de postuler à nouveau à un poste
                </p>
                {candidate.length > 0 ? (
                  <p className="text-sm">
                    Vous avez déjà postulé au poste de {candidate[0].role.title}
                  </p>
                ) : (
                  <div> </div>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => cancelCandidatClick(candidate[0].id)}
            type="button"
            className=" m-14 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Annuler votre candidature
          </button>
        </div>
      )}
    </div>
  );
}

export default Candidature;
