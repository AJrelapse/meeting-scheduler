import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Clock, Timer } from "lucide-react";
import Link from "next/link";

function ScheduledMeetingList({ meetingList }) {
  if (!meetingList || meetingList.length === 0) {
    return <p>No scheduled meetings.</p>;
  }

  // Remove duplicates using a Set
  const uniqueMeetings = Array.from(
    new Map(meetingList.map((meeting) => [meeting.id, meeting])).values()
  );

  return (
    <div>
      {uniqueMeetings.map((meeting) => (
        <Accordion key={meeting.id} type="single" collapsible>
          <AccordionItem value={`meeting-${meeting.id}`}>
            <AccordionTrigger>{meeting?.formatedDate}</AccordionTrigger>
            <AccordionContent>
              <div className="mt-5 flex flex-col gap-4">
                <h2 className="flex gap-2 items-center">
                  <Clock /> {meeting?.duration} Min
                </h2>
                <h2 className="flex gap-2 items-center">
                  <CalendarCheck /> {meeting?.formatedDate}
                </h2>
                <h2 className="flex gap-2 items-center">
                  <Timer /> {meeting?.selectedTime}
                </h2>

                {meeting?.locationUrl && (
                  <Link
                    href={`https://${meeting?.locationUrl}`}
                    className="text-primary"
                  >
                    {meeting?.locationUrl}
                  </Link>
                )}

                {meeting?.locationUrl ? (
                  <Link href={`https://${meeting?.locationUrl}`}>
                    <Button className="mt-5">Join Now</Button>
                  </Link>
                ) : (
                  <Button className="mt-5" disabled>
                    No Meeting Link
                  </Button>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}

export default ScheduledMeetingList;
