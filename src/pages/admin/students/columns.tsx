import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";

import { useNavigate } from "react-router-dom";
import { Student } from "../../../types/student.type";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "nce",
    header: "NCE",
  },
  {
    accessorKey: "firstName",
    header: "Prénom",
  },
  {
    accessorKey: "lastName",
    header: "Nom",
  },
  {
    accessorKey: "className",
    header: "Classe",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const student = row.original;
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
                navigator.clipboard.writeText(student.nce.toString())
              }
            >
              Copier le NCE
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate(`/admin/students/edit/${student.id}`)}
            >
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <AlertDialog>
                <AlertDialogTrigger>Supprimer</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this student and remove your it from the servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        navigate(`/admin/students/delete/${student.id}`)
                      }
                    >
                      Supprimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
