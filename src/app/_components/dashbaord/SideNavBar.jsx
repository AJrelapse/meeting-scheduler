"use client";
import { Button } from "@/components/ui/button";
import SideBarMenuOptions from "@/utils/SideBarMenuOptions";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import localFont from "next/font/local";

const aeonikPro = localFont({
  src: "../../../../public/fonts/AeonikPro-Regular.ttf",
  display: "swap",
  weight: "400",
});

function SideNavBar() {
  const path = usePathname();
  const [activePath, setActivePath] = useState(path);

  useEffect(() => {
    path && setActivePath(path);
  }, [path]);

  return (
    <div className="w-64 p-6 py-10 h-full border-r border-gray-800 bg-black/80 backdrop-blur-xl shadow-lg">
    <div className="flex justify-center">
      <Link href={"/dashboard"}>
        <div
          className={`${aeonikPro.className} text-2xl md:text-3xl font-bold tracking-wide`}
          style={{ color: "#DBFF00" }}
        >
          AJ Relapse
        </div>
      </Link>
    </div>
  
    <Link href={"/create-meeting"}>
      <Button className="flex items-center gap-2 w-full mt-8 rounded-full text-lg font-medium transition-all hover:scale-105">
        <Plus className="w-5 h-5" /> Create Meeting
      </Button>
    </Link>
    <hr className="mt-8 mb-8 border-gray-600 w-90% mx-auto" />
    <div className="mt-6 flex flex-col gap-4">
      {SideBarMenuOptions.map((item, index) => (
        <Link href={item.path} key={index}>
          <Button
            variant="ghost"
            className={`w-full flex gap-3 items-center text-lg font-medium px-4 py-3 rounded-lg transition-all duration-300 hover:bg-violet-500/10 hover:text-violet-400
              ${activePath == item.path ? "text-violet-400 bg-violet-500/10" : "text-gray-300"}
            `}
          >
           {item.name}
          </Button>
        </Link>
      ))}
    </div>
  </div>
  
  );
}

export default SideNavBar;
