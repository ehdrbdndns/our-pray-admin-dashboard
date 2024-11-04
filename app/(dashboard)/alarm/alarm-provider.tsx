"use client"

import { AlarmType } from "@/lib/db/type";
import { createContext, Dispatch, SetStateAction } from "react";

export const AlarmContext = createContext<{
  alarms: AlarmType[],
  setAlarms: Dispatch<SetStateAction<AlarmType[]>>
}>({
  alarms: [],
  setAlarms: () => { }
});