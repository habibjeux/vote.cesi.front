import { useLocation, useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { Student } from "../../types/student.type";
import { FormEvent, useEffect, useState } from "react";
import { getOtpByStudent, verifyOtp } from "../../services/otps.service";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { saveUser } from "../../services/login.service";

export default function OTPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState<string | null>(null);
  const student: Student = location.state?.student;
  const [value, setValue] = useState<string>("");
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getOtpHandle = async () => {
    try {
      const response = await getOtpByStudent(student);
      setMessage(response);
      console.log(response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ERR_NETWORK") {
          setError(
            "Impossible de se connecter au serveur. Vérifiez votre connexion internet ou contactez l'administrateur."
          );
        } else {
          console.log(err.response?.data);
          setError(() => err.response?.data);
        }
      } else {
        setError(() => "Une erreur inattendue s'est produite.");
        console.error("Unexpected error:", error);
      }
    }
  };

  useEffect(() => {
    getOtpHandle();
    setLoadingPage(false);
  }, []);

  const verifyOtpHandle = async () => {
    try {
      const response = await verifyOtp(student.id, value);
      saveUser(response);
      return navigate("/student");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ERR_NETWORK") {
          setError(
            "Impossible de se connecter au serveur. Vérifiez votre connexion internet ou contactez l'administrateur."
          );
        } else {
          console.log(err.response?.data);
          setError(() => err.response?.data);
        }
      } else {
        setError(() => "Une erreur inattendue s'est produite.");
        console.error("Unexpected error:", error);
      }
    }
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setLoading(true);
    verifyOtpHandle();
    setLoading(false);
  }

  return (
    <div>
      <div className="flex w-screen h-screen items-center justify-center">
        <div className="border rounded-sm max-w-96 py-10 px-10">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {loadingPage ? (
            <p>Loading...</p>
          ) : (
            <p className="text-wrap">Veuillez entrer le code reçu par email</p>
          )}
          <form onSubmit={handleSubmit} className="text-center">
            <Button
              className={`w-full mt-6 py-2 ${
                value?.length != 6 &&
                "cursor-not-allowed opacity-50 pointer-events-none"
              }`}
            >
              {!loading ? "S'identifier" : "Loading..."}
            </Button>
          </form>
          {error && (
            <Badge className="w-full mt-2" variant={"destructive"}>
              {error}
            </Badge>
          )}
          {message && (
            <Badge className="w-full mt-2" variant={"default"}>
              {message}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
