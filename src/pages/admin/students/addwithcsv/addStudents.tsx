import { useState, CSSProperties, useEffect, FormEvent } from "react";

import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from "react-papaparse";
import { DataTable } from "../../../../components/ui/data-table";
import { Button } from "../../../../components/ui/button";
import { CopyPlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Student } from "../../../../types/student.type";
import { columns } from "../columns";
import { Classe } from "../../../../types/classe.type";
import { getAllClasses } from "../../../../services/classes.service";
import axios from "axios";
import { Badge } from "../../../../components/ui/badge";
import { addStudents } from "../../../../services/students.service";

const GREY = "#CCC";
const GREY_LIGHT = "rgba(255, 255, 255, 0.4)";
const DEFAULT_REMOVE_HOVER_COLOR = "#A01919";
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = "#686868";

const styles = {
  zone: {
    alignItems: "center",
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    padding: 20,
  } as CSSProperties,
  file: {
    background: "linear-gradient(to bottom, #EEE, #DDD)",
    borderRadius: 20,
    display: "flex",
    height: 120,
    width: 120,
    position: "relative",
    zIndex: 10,
    flexDirection: "column",
    justifyContent: "center",
  } as CSSProperties,
  info: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10,
  } as CSSProperties,
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: "0.5em",
    justifyContent: "center",
    display: "flex",
  } as CSSProperties,
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: "0.5em",
  } as CSSProperties,
  progressBar: {
    bottom: 14,
    position: "absolute",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  } as CSSProperties,
  zoneHover: {
    borderColor: GREY_DIM,
  } as CSSProperties,
  default: {
    borderColor: GREY,
  } as CSSProperties,
  remove: {
    height: 23,
    position: "absolute",
    right: 6,
    top: 6,
    width: 23,
  } as CSSProperties,
};

export default function AddStudentsCSVPage() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<Classe[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [errorNoClasse, setErrorNoClasse] = useState<string | null>(null);
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );
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

  const addStudentsHandler = async () => {
    try {
      await addStudents(students);
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
        console.error("Unexpected error:", error);
      }
      setLoading(false);
    }
  };

  function handleChange(e: any) {
    const { name, value } = e.target;
    setStudents((prev) =>
      prev.map((student) => ({ ...student, [name]: value }))
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    addStudentsHandler();
  }

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
          <CSVReader
            onUploadAccepted={(results: any) => {
              console.log(results.data);
              const studentArray: Student[] = results.data
                .slice(1)
                .filter((row: string) => row.length === 4)
                .map((student: Student) => ({
                  nce: student[0],
                  firstName: student[1],
                  lastName: student[2],
                  email: student[3],
                  className: classes[0].name,
                }));
              setStudents(studentArray);
              setZoneHover(false);
            }}
            onDragOver={(event: DragEvent) => {
              event.preventDefault();
              setZoneHover(true);
            }}
            onDragLeave={(event: DragEvent) => {
              event.preventDefault();
              setZoneHover(false);
            }}
          >
            {({
              getRootProps,
              acceptedFile,
              ProgressBar,
              getRemoveFileProps,
              Remove,
            }: any) => (
              <>
                <div
                  {...getRootProps()}
                  style={Object.assign(
                    {},
                    styles.zone,
                    zoneHover && styles.zoneHover
                  )}
                >
                  {acceptedFile ? (
                    <>
                      <div style={styles.file}>
                        <div style={styles.info}>
                          <span style={styles.size}>
                            {formatFileSize(acceptedFile.size)}
                          </span>
                          <span style={styles.name}>{acceptedFile.name}</span>
                        </div>
                        <div style={styles.progressBar}>
                          <ProgressBar />
                        </div>
                        <div
                          {...getRemoveFileProps()}
                          style={styles.remove}
                          onMouseOver={(event: Event) => {
                            event.preventDefault();
                            setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                          }}
                          onMouseOut={(event: Event) => {
                            event.preventDefault();
                            setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                          }}
                        >
                          <Remove color={removeHoverColor} />
                        </div>
                      </div>
                    </>
                  ) : (
                    "Drop CSV file here or click to upload"
                  )}
                </div>
              </>
            )}
          </CSVReader>
          {students.length > 0 && (
            <div className="mt-4">
              <form
                onSubmit={handleSubmit}
                className="border p-6 mb-4 rounded-sm flex items-center justify-center gap-4"
              >
                <select
                  name="className"
                  onChange={handleChange}
                  className="hover:cursor-pointer shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {classes.map((classe) => (
                    <option key={classe.id} value={classe.name}>
                      {classe.name}
                    </option>
                  ))}
                </select>
                <Button className="p-2 bg-primary text-white rounded-full shadow-lg">
                  <CopyPlusIcon />
                  {!loading ? "Importer" : "Loading..."}
                </Button>
              </form>
              {error && (
                <Badge className="w-full mt-2" variant={"destructive"}>
                  {error}
                </Badge>
              )}
              <div className="max-h-[313px] overflow-auto">
                <DataTable columns={columns} data={students} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
