import { useEffect, useState } from "react";
import Card from "../../components/ui/card-home";
import Text from "../../components/ui/text";
import { BookOpen, HomeIcon, UserIcon, UsersIcon } from "lucide-react";
import {
  getCountCandidate,
  getCountClass,
  getCountRole,
  getCountStudent,
} from "../../services/count.services";
export default function AdminPage() {
  const [countStudent, setCountStudent] = useState<number>(0);
  const [countCandidate, setCountCandidate] = useState<number>(0);
  const [countRole, setCountRole] = useState<number>(0);
  const [countClass, setCountClass] = useState<number>(0);
  useEffect(() => {
    getCountStudentHandle();
    getCountCandidateHandle();
    getCountRoleHandle();
    getCountClassHandle();
  }, []);
  const getCountStudentHandle = async () => {
    try {
      const count = await getCountStudent();
      setCountStudent(count);
    } catch (error) {
      console.error(error);
    }
  };
  const getCountCandidateHandle = async () => {
    try {
      const count = await getCountCandidate();
      setCountCandidate(count);
    } catch (error) {
      console.error(error);
    }
  };
  const getCountRoleHandle = async () => {
    try {
      const count = await getCountRole();
      setCountRole(count);
    } catch (error) {
      console.error(error);
    }
  };
  const getCountClassHandle = async () => {
    try {
      const count = await getCountClass();
      setCountClass(count);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Text variant="h1">Dashboard</Text>
      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            title="Etudiants"
            value={`${countStudent?.toString()}`}
            icon={UserIcon}
          />
          <Card
            title="Candidats"
            value={`${countCandidate?.toString()}`}
            icon={UsersIcon}
          />
          <Card
            title="Postes"
            value={`${countRole?.toString()}`}
            icon={HomeIcon}
          />
          <Card
            title="Classes"
            value={`${countClass?.toString()}`}
            icon={BookOpen}
          />
        </div>
      </section>
    </div>
  );
}
