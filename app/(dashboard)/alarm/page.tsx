"use client"

import { useEffect, useState } from "react";
import AlarmTable from "./alarm-table";
import { AlarmType } from "@/lib/db/type";
import { AlarmContext } from "./alarm-provider";

export default function AlarmPage() {

  const [alarms, setAlarms] = useState<AlarmType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAlarms = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/alarm');
        const data = await res.json();

        if (res.status !== 200) {
          throw new Error(data.error);
        }

        setAlarms(data);
      } catch (e) {
        console.error(e);
        console.log('알람 정보를 가져오는데 실패했습니다.');
      }
      setIsLoading(false);
    }

    fetchAlarms();
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <AlarmContext.Provider value={{ alarms, setAlarms }}>
      <AlarmTable />
    </AlarmContext.Provider>
  )
}