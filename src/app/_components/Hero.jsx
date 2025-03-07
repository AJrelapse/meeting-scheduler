"use client";

import { Button } from "@/components/ui/button";
import { auth, signInWithGoogle } from "@/services/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import localFont from "next/font/local";

const aeonikPro = localFont({
  src: "../../../public/fonts/AeonikPro-Regular.ttf",
  display: "swap",
  weight: "400",
});

const Hero = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle().then(() => {
      router.push("/dashboard");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="max-w-4xl">
        <h1 className={`${aeonikPro.className} font-bold text-[65px] leading-tight text-white`}>
          Schedule <span className="text-purple-400">Meetings</span> Seamlessly
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-20">
          From keyboard to internet brought to you by <span className={`${aeonikPro.className} text-purple-400`}  style={{ color: "#DBFF00" }}>AJ Relapse</span>  <br/>
          student of VIT vellore
        </p>

        <hr className="mt-16 border-gray-600 w-3/4 mx-auto" />

        {user ? (
          <Button 
            className="mt-6 px-6 py-3 text-lg font-medium bg-purple-500 hover:bg-purple-600"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
        ) : (
          <div className="mt-6 flex flex-col items-center">
            <div className="flex justify-center">
              <Button
                className="flex items-center gap-3 px-6 py-3 text-lg font-medium bg-purple-500 hover:bg-purple-600"
                onClick={handleSignInWithGoogle}
              >
                <Image src="/google.png" width={25} height={25} alt="Google" />
                Sign Up with Google
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
