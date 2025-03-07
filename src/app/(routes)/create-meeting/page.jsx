"use client";
import MeetingForm from "@/app/_components/create-meeting/MeetingForm";
import { useState } from "react";

function CreateMeeting() {
  const [formValue, setFormValue] = useState();

  return (
    <div className="flex justify-center items-center min-h-screen bg-background text-foreground px-6">
      <div className="w-full max-w-2xl p-6 bg-card shadow-lg border border-border rounded-xl">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Schedule Your Meeting
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          Enter meeting details and generate your booking link effortlessly.
        </p>

        <MeetingForm setFormValue={(v) => setFormValue(v)} />
      </div>
    </div>
  );
}

export default CreateMeeting;
