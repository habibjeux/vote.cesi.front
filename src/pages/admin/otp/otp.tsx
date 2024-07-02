import { useLocation } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../../components/ui/input-otp";
import { Student } from "../../../types/student.type";
import { Otp } from "../../../types/otp.type";
import { useEffect, useState } from "react";
import { getOtpByStudent } from "../../../services/otps.service";
import axios from "axios";

export default function OTPPage() {
  const location = useLocation();
  const user: Student = location.state?.user;
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState<Otp>({
    id: 0,
    code: "",
    expiryDate: new Date(),
    student: user,
  });

  const getOtpHandle = async () => {
    try {
      const response: Otp = await getOtpByStudent(user.id);
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
    console.log(otp);
  }, []);

  return (
    <div>
      <div className="flex w-screen h-screen items-center justify-center">
        <div className="border rounded-sm py-36 px-10">
          <InputOTP maxLength={6}>
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
        </div>
      </div>
    </div>
  );
}
