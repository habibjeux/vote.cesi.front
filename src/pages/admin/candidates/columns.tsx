import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../components/ui/drawer";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";
import { Candidate } from "../../../types/candidates.type";
import { useEffect, useState } from "react";
import { getCandidateById } from "../../../services/candidates.service";
import axios from "axios";

export const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: "student.nce",
    header: "NCE",
  },
  {
    accessorKey: "student.firstName",
    header: "Prénom",
  },
  {
    accessorKey: "student.lastName",
    header: "Nom",
  },
  {
    accessorKey: "role.title",
    header: "Rôle",
  },
  {
    accessorKey: "isRetained",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isRetained = row.getValue("isRetained");
      return isRetained ? "Retenu" : "Non Retenu";
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const candidate = row.original;
      const navigate = useNavigate();
      const [loading, setLoading] = useState<boolean>(false);
      const [candidateT, setCandidateT] = useState<Candidate | null>(null);
      const [error, setError] = useState<string | null>(null);
      useEffect(() => {
        setLoading(true);
        getCandidateByIdHandle();
        setLoading(false);
      }, []);
      const getCandidateByIdHandle = async () => {
        try {
          const response = await getCandidateById(candidate.id!);
          setCandidateT(response);
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
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(candidate.student.nce.toString())
              }
            >
              Copier NCE
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigate(`/admin/candidates/changeStatus/${candidate.id}`)
              }
            >
              Changer Etat
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Drawer>
                <DrawerTrigger>Infos</DrawerTrigger>
                <DrawerContent>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <DrawerHeader>
                      <DrawerClose className="text-right">Fermer</DrawerClose>
                      <div className="flex flex-col gap-2">
                        <div>
                          <Avatar>
                            <AvatarImage src={candidate?.photoURL} />
                            <AvatarFallback>
                              {candidate?.student.firstName.charAt(0)}
                              {candidate?.student.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <DrawerTitle>
                            {candidateT?.student.firstName}{" "}
                            {candidateT?.student.lastName}
                          </DrawerTitle>
                          <DrawerDescription>
                            {candidateT?.role.title}
                          </DrawerDescription>
                        </div>
                        <div>{candidateT?.student.nce}</div>
                        <div>{candidateT?.student.email}</div>
                        <div>{candidateT?.program}</div>
                      </div>
                    </DrawerHeader>
                  )}
                </DrawerContent>
              </Drawer>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
