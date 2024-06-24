import { Link } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen flex  justify-center items-center">
      <div className="border w-/12 p-6 rounded-sm">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="NCE"
        >
          NCE
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="NCE"
          type="text"
          placeholder="Entrer votre NCE"
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2 mt-4"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Entrer votre email"
        />
        <Badge className="w-full mt-2 hidden" variant={"destructive"}>
          Error
        </Badge>
        <Link to="#">
          <Button className="w-full mt-6 py-2">S'identifier</Button>
        </Link>
      </div>
    </div>
  );
}
