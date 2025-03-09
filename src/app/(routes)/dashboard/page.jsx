"use client";

import MeetingEventList from "@/app/_components/meeting-type/MeetingEventList";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/services/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [meetings, setMeetings] = useState([]);
  const [fetched, setFetched] = useState(false); // Ensures fetch only runs once

  const isBusinessRegistered = async () => {
    if (!user?.uid) return;
    try {
      const docRef = doc(db, "Business", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        router.replace("/create-business");
      }
    } catch (error) {
      console.error("Error checking business registration:", error);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      isBusinessRegistered();
    }
  }, [user, loading]);

  useEffect(() => {
    if (!user || fetched) return; // Prevent duplicate fetching

    const fetchMeetings = async () => {
      try {
        const q = query(collection(db, "MeetingEvent"), where("createdBy", "==", user.uid));
        const querySnapshot = await getDocs(q);

        // Ensure uniqueness using Set
        const uniqueMeetings = new Set();

        const meetingsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter only unique meetings by ID
        meetingsArray.forEach((meeting) => {
          uniqueMeetings.add(JSON.stringify(meeting));
        });
        // Convert back to array
        setMeetings([...new Set([...Array.from(uniqueMeetings)].map((m) => JSON.parse(m)))]);
        console.log(meetings);
        setFetched(true); // Ensures fetch happens only once
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, [user, fetched]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-3xl">Meeting Event Type</h2>
        <Input placeholder="Search" className="max-w-xs " />
        <hr />
      </div>
      <MeetingEventList meetings={meetings} />
    </div>
  );
};

export default Dashboard;
