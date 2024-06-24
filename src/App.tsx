import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import CESI from "./assets/CESI.png";
import vote from "./assets/vote.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardIcon,
  CardTitle,
} from "./components/ui/card";
import {
  UsersIcon,
  ShieldCheck,
  ShieldCheckIcon,
  CheckCheck,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="md:mx-20 mx-4 mt-6">
      <header className="flex justify-between items-center">
        <p>
          <img src={CESI} width={80} height={80} alt="Logo de CESI" />
        </p>
        <h1 className="text-3xl font-bold text-accents">Election CESI</h1>
        <p>
          <Link to="/login">
            <Button>Connexion</Button>
          </Link>
        </p>
      </header>
      <section className="my-12">
        <Badge variant="outline" className="bg-secondary py-1">
          Votre voix compte pour l'avenir du Club
        </Badge>
      </section>
      <section className="flex flex-1">
        <div>
          <h2 className="text-5xl font-bold flex-shrink-0 mb-8">
            <span className="text-primary font-black">Voxacesi</span>, la
            solution de vote en ligne sécurisée pour les élections de CESI
          </h2>
          <p className="text-xl">
            <span className="text-primary font-black">
              Une plateforme développée par des étudiants
            </span>
            , pour les étudiants, afin de renforcer la démocratie au sein du
            Club
          </p>
        </div>
        <div className="flex flex-shrink-0 -mt-8">
          <img
            className=""
            src={vote}
            width={400}
            height={400}
            alt="Vote Illustration"
          />
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-8">Les différentes étapes</h2>
        <div className="grid grid-cols-4 grid-rows-1 gap-4">
          <Card>
            <CardIcon>
              <UsersIcon className="w-full h-16" />
            </CardIcon>
            <CardHeader>
              <CardTitle>Être étudiant de la section Informatique</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                La première étape est de vérifier votre éligibilité en tant
                qu'étudiant de la section Informatique du CESI. Seuls les
                étudiants inscrits dans cette la section informatique peuvent
                participer au vote.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardIcon>
              <ShieldCheck className="w-full h-16" />
            </CardIcon>
            <CardHeader>
              <CardTitle>Se connecter à la plateforme de vote</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Fournissez vos informations personnelles telles que votre numéro
                de carte étudiante (NCE), votre nom, prénom et adresse e-mail.
                Ces données serviront à valider votre identité.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardIcon>
              <ShieldCheckIcon className="w-full h-16" />
            </CardIcon>
            <CardHeader>
              <CardTitle>Choisissez votre candidat</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Consultez la liste des candidats en lice pour les élections et
                découvrez leurs programmes respectifs. Choisissez le candidat
                qui correspond le mieux à vos attentes.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardIcon>
              <CheckCheck className="w-full h-16" />
            </CardIcon>
            <CardHeader>
              <CardTitle>Voter en toute confiance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Une fois votre choix effectué, validez votre vote en toute
                sécurité. Votre voix est anonyme et confidentielle. Vous avez la
                garantie que votre vote sera pris en compte.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="pt-10 text-center">
        <h2 className="font-bold text-4xl">Procedez au vote maintenant!</h2>
        <Link to="/login">
          <Button className="my-6 px-10 py-5 font-mono text-xl">
            Accéder à la plateforme
          </Button>
        </Link>
      </section>
      <footer className="py-14">
        <p className="text-center">
          Propulsé par
          <Link to="">
            <span className="italic underline">M2SIR</span> @ 2024
          </Link>
        </p>
      </footer>
    </div>
  );
}
