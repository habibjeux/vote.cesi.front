import { useLocation, useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { Student } from "../../types/student.type";
import { Otp } from "../../types/otp.type";
import { FormEvent, useEffect, useState } from "react";
import { getOtpByStudent } from "../../services/otps.service";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export default function OTPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const user: Student = location.state?.user;
  const [value, setValue] = useState<string>("");
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState<Otp | null>(null);

  const getOtpHandle = async () => {
    try {
      const response: Otp = await getOtpByStudent(user);
      console.log(response);
      setOtp(response);
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

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setLoading(true);
    if (otp?.code === value) {
      navigate("/student", { state: { user: user } });
    }
    if (otp?.expiryDate != null) {
      const expiryDate = new Date(otp?.expiryDate);
      if (expiryDate.getTime() < new Date().getTime()) {
        setError("Code expiré! Veuillez en générer un autre.");
      }
    }
    if (otp?.code !== value) {
      setError("Code incorrect");
    }
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
        </div>
      </div>
    </div>
  );
}
