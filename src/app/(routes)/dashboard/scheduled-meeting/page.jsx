"use client";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

import ScheduledMeetingList from "@/app/_components/scheduled-meeting/ScheduledMeetingList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth, db } from "@/services/firebase";

function ScheduledMeeting() {
  const [user] = useAuthState(auth);
  const [meetingList, setMeetingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getScheduledMeetings();
    }
  }, [user]);

  const getScheduledMeetings = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "ScheduledMeetings"),
        where("businessEmail", "==", user?.email)
      );
      const querySnapshot = await getDocs(q);

      const meetings = [];
      querySnapshot.forEach((doc) => {
        meetings.push({ id: doc.id, ...doc.data() });
      });

      setMeetingList(meetings);
    } catch (error) {
      console.error("Error fetching scheduled meetings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterMeetingList = (type) => {
    if (!meetingList.length) return [];

    return meetingList.filter((item) => {
      if (!item.formatedTimeStamp) return false; // Ensure valid timestamp

      const meetingTime = new Date(item.formatedTimeStamp).getTime();
      const currentTime = new Date().getTime();

      return type === "upcoming" ? meetingTime >= currentTime : meetingTime < currentTime;
    });
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Scheduled Meetings</h2>
      <hr className="my-5" />

      {loading ? (
        <p>Loading meetings...</p>
      ) : (
        <Tabs defaultValue="upcoming" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <ScheduledMeetingList meetingList={filterMeetingList("upcoming")} />
          </TabsContent>

          <TabsContent value="expired">
            <ScheduledMeetingList meetingList={filterMeetingList("expired")} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

export default ScheduledMeeting;
