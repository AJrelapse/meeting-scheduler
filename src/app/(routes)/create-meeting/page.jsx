"use client";
import MeetingForm from "@/app/_components/create-meeting/MeetingForm";
import PreviewMeeting from "@/app/_components/create-meeting/PreviewMeeting";
import { useState } from "react";

function CreateMeeting() {
  const [formValue, setFormValue] = useState();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="shadow-md border h-screen">
        <MeetingForm setFormValue={(v) => setFormValue(v)} />
      </div>
    </div>
  );
}

export default CreateMeeting;
