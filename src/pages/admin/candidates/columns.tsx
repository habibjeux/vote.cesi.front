import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../../../components/ui/button";
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
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
