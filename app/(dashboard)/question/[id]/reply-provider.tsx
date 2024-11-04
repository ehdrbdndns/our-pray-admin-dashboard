"use client"

import { ReplyType } from "@/lib/db/type";
import { createContext, Dispatch, SetStateAction } from "react";

export const ReplyContext = createContext<{
  replys: ReplyType[],
  setReplys: Dispatch<SetStateAction<ReplyType[]>>
}>({
  replys: [],
  setReplys: () => { }
});