"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown_menu";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/services/firebase";
import LocationOptions from "@/utils/LocationOptions";
import ThemeOptions from "@/utils/ThemeOptions";
import { doc, setDoc } from "firebase/firestore";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";

console.log("Firestore Database in MeetingForm:", db);

function MeetingForm({ setFormValue }) {
  const [eventName, setEventName] = useState("");
  const [duration, setDuration] = useState(30);
  const [locationType, setLocationType] = useState(null);
  const [locationUrl, setLocationUrl] = useState("");
  const [themeColor, setThemeColor] = useState("");
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    setFormValue({
      eventName,
      duration,
      locationType,
      locationUrl,
      themeColor,
    });
  }, [eventName, duration, locationType, locationUrl, themeColor]);

  const onCreateClick = async () => {
    if (!user) {
      toast.error("You must be logged in to create an event.");
      return;
    }

    const id = Date.now().toString();
    const newMeeting = {
      id,
      eventName,
      duration,
      locationType,
      locationUrl,
      themeColor,
      businessId: user.uid ? doc(db, "Business", user.uid) : null,
      createdBy: user.email,
    };

    try {
      await setDoc(doc(db, "MeetingEvent", id), newMeeting);
      toast.success("New Meeting Event Created!");
      router.replace("/dashboard");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in to create an event.</p>;

  return (
    <div className="p-8">
      <Link href={"/dashboard"}>
        <h2 className="flex gap-2">
          <ChevronLeft /> Cancel
        </h2>
      </Link>
      <div className="mt-4">
        <h2 className="font-bold text-2xl my-4">Create New Event</h2>
        <hr />
      </div>
      <div className="flex flex-col gap-3 my-4">
        <h2 className="font-bold">Event Name *</h2>
        <Input
          placeholder="Name of your meeting event"
          value={eventName}
          onChange={(event) => setEventName(event.target.value)}
        />

        <h2 className="font-bold">Duration *</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">{duration} Min</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[15, 30, 45, 60].map((time) => (
              <DropdownMenuItem key={time} onClick={() => setDuration(time)}>
                {time} Min
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <h2 className="font-bold">Location *</h2>
        <div className="grid grid-cols-4 gap-3">
          {LocationOptions.map((option, index) => (
            <div
              key={index}
              className={`border flex flex-col justify-center items-center 
                     p-3 rounded-lg cursor-pointer
                     hover:bg-blue-100 hover:border-primary
                     ${locationType === option.name && "bg-blue-100 border-primary"}`}
              onClick={() => setLocationType(locationType === option.name ? null : option.name)}
            >
              <Image src={option.icon} width={30} height={30} alt={option.name} />
              <h2>{option.name}</h2>
            </div>
          ))}
        </div>

        {locationType && (
          <>
            <h2 className="font-bold">Add {locationType} URL *</h2>
            <Input
              placeholder="Add URL"
              value={locationUrl}
              onChange={(event) => setLocationUrl(event.target.value)}
            />
          </>
        )}

        <h2 className="font-bold">Select Theme Color</h2>
        <div className="flex justify-evenly">
          {ThemeOptions.map((color, index) => (
            <div
              key={index}
              className={`h-7 w-7 rounded-full cursor-pointer ${
                themeColor === color && `border-4 border-gray-900`
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setThemeColor(color)}
            ></div>
          ))}
        </div>
      </div>

      <Button
        className="w-full mt-9"
        disabled={!eventName || !duration || !locationType || !locationUrl}
        onClick={onCreateClick}
      >
        Create
      </Button>
    </div>
  );
}

export default MeetingForm;
