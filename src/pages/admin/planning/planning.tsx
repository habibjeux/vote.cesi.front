import { useEffect, useState } from "react";
import Text from "../../../components/ui/text";
import {
  getPlanning,
  createPlanning,
} from "../../../services/planning.service";
import { Planning } from "../../../types/planning.type";
import axios from "axios";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { dateFormater, formatDateForInput } from "../../../lib/dateFormater";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export default function PlanningPage() {
  const [planning, setPlanning] = useState<Planning | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorPage, setErrorPage] = useState<string | null>(null);
  const [form, setForm] = useState({
    startDate: formatDateForInput(new Date()),
    endDate: formatDateForInput(new Date()),
  });
  useEffect(() => {
    setLoading(true);
    getPlanningHandle();
    setLoading(false);
  }, []);

  const getPlanningHandle = async () => {
    try {
      const planning = await getPlanning();
      setPlanning(planning);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ERR_NETWORK") {
          setErrorPage(
            "Impossible de se connecter au serveur. Vérifiez votre connexion internet ou contactez l'administrateur."
          );
        } else {
          setErrorPage(() => err.response?.data);
        }
      } else {
        setErrorPage(() => "Une erreur inattendue s'est produite.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dateDebut = new Date(form.startDate);
    const dateFin = new Date(form.endDate);
    const eightHours = 8 * 60 * 60 * 1000;
    if (dateFin.getTime() - dateDebut.getTime() <= eightHours) {
      setError("La durée du vôte doit être supérieure à 8 heures");
      return;
    }
    if (!dateDebut.getTime()) {
      setError("La date de début est incorrecte");
      return;
    }
    if (!dateFin.getTime()) {
      setError("La date de fin est incorrecte");
      return;
    }
    createPlanningHandle(new Date(form.startDate), new Date(form.endDate));
  };

  const createPlanningHandle = async (startDate: Date, endDate: Date) => {
    try {
      await createPlanning(startDate, endDate);
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
      }
    }
  };

  return (
    <div>
      <Text variant="h1">Planning</Text>
      {loading ? (
        <Text variant="h2">Loading...</Text>
      ) : planning ? (
        <div>
          <Text variant="h2">
            Début: {dateFormater(new Date(planning.startDate))}
          </Text>
          <Text variant="h2">
            Fin: {dateFormater(new Date(planning.endDate))}
          </Text>
        </div>
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <Button>Planifier</Button>
          </SheetTrigger>
          <SheetContent className="flex justify-center items-center">
            <SheetHeader>
              <SheetTitle>Planifier le vôte</SheetTitle>
              <SheetDescription>
                Veuillez choisir la date de début et de fin de ce vôte
              </SheetDescription>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <Label>Date de Début</Label>
                  <Input
                    id="dateDebut"
                    onChange={handleChange}
                    value={form.startDate}
                    type="datetime-local"
                  />
                </div>
                <div>
                  <Label>Date de Fin</Label>
                  <Input
                    id="dateFin"
                    onChange={handleChange}
                    value={form.startDate}
                    type="datetime-local"
                  />
                </div>
                {error && (
                  <Badge
                    className={`w-full mt-2 variant hidden ${error && "block"}`}
                    variant={"destructive"}
                  >
                    {error}
                  </Badge>
                )}
                <Button type="submit">Planifier</Button>
              </form>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
      {errorPage && (
        <Badge className="w-full mt-2" variant={"destructive"}>
          {errorPage}
        </Badge>
      )}
    </div>
  );
}
