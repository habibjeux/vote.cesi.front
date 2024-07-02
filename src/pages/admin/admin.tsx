import Card from "../../components/ui/card-home";
import Text from "../../components/ui/text";
import { BookOpen, HomeIcon, UserIcon, UsersIcon } from "lucide-react";
export default function AdminPage() {
  return (
    <div>
      <Text variant="h1">Dashboard</Text>
      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card title="Students" value="100" icon={UserIcon} />
          <Card title="Candidates" value="50" icon={UsersIcon} />
          <Card title="Postes" value="10" icon={HomeIcon} />
          <Card title="Classes" value="5" icon={BookOpen} />
        </div>
      </section>
    </div>
  );
}
