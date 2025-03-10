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
    <div className="p-5 py-8 bg-black h-full border-r border-violet-950">
      <div className="flex justify-center bg-black">
        <Link href={"/dashboard"}>
            <div className={`${aeonikPro.className} text-2xl md:text-3xl font-bold`} style={{ color: "#DBFF00" }}>
              AJ Relapse
            </div>
        </Link>
      </div>

      <Link href={"/create-meeting"}>
        <Button
          className="flex gap-2 w-full 
                mt-7
                rounded-full"
        >
          <Plus /> Create
        </Button>
      </Link>

      <div className="mt-5 flex flex-col gap-5">
        {SideBarMenuOptions.map((item, index) => (
          <Link href={item.path} key={index}>
            <Button
              variant="ghost"
              className={`w-full flex gap-2 justify-start hover:bg-blue-100 hover:text-primary font-normal text-lg
                        ${activePath == item.path && "text-primary bg-black"}
                        `}
            >
              <item.icon /> {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNavBar;
