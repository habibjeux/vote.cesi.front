import { TooltipProvider } from "@radix-ui/react-tooltip";
import { SideNavbar } from "../../components/sidenav";
import {
  ArrowBigLeft,
  AwardIcon,
  BookA,
  BookAudio,
  CogIcon,
  HomeIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen flex-col md:flex-row md:overflow-hidden">
      <div
        className={`relative w-full flex-none md:w-64 ${
          isCollapsed && "md:w-auto"
        }`}
      >
        <TooltipProvider>
          <SideNavbar
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Dashboard",
                icon: HomeIcon,
                link: "",
                variant: "default",
              },
              {
                title: "Classes",
                icon: BookAudio,
                link: "/classes",
                variant: "ghost",
              },
              {
                title: "Etudiants",
                icon: UserIcon,
                link: "/students",
                variant: "ghost",
              },
              {
                title: "Rôles",
                icon: CogIcon,
                link: "/roles",
                variant: "ghost",
              },
              {
                title: "Candidats",
                icon: AwardIcon,
                link: "/candidates",
                variant: "ghost",
              },
              {
                title: "Résultats",
                icon: CogIcon,
                link: "/results",
                variant: "ghost",
              },
              {
                title: "Déconnexion",
                icon: LogOutIcon,
                link: "/signout",
                variant: "ghost",
              },
            ]}
          />
          <Button
            className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-full shadow-lg"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <CogIcon /> : <ArrowBigLeft />}
          </Button>
        </TooltipProvider>
      </div>
      <main className="overflow-hidden border bg-background shadow w-full md:px-8 md:py-8">
        <Outlet />
      </main>
    </div>
  );
}
