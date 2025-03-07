"use client";

import { Button } from "@/components/ui/button";
import { auth, signInWithGoogle } from "@/services/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import AvatarMenu from "./AvatarMenu";
import localFont from "next/font/local";

const aeonikPro = localFont({
  src: "../../../public/fonts/AeonikPro-Regular.ttf",
  display: "swap",
  weight: "400",
});

const Header = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle().then((_) => {
      router.push("/dashboard");
    });
  };

  return (
    <div className="flex items-center justify-between p-5 max-w-7xl mx-auto">
      <div className={`${aeonikPro.className} text-2xl md:text-3xl font-bold`} style={{ color: "#DBFF00" }}>
          AJ Relapse
      </div>

      <div className="flex items-center gap-3">
        {!user && (
          <Button variant="ghost" size="icon" className="w-14 h-10" onClick={handleSignInWithGoogle}>
            Login
          </Button>
        )}

        {user ? (
          <AvatarMenu />
        ) : (
          <Button onClick={handleSignInWithGoogle}>Get Started</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
