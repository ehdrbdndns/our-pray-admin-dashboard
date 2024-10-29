"use client"

import { BibleType } from "@/lib/db/type";
import { createContext, Dispatch, SetStateAction } from "react";

export const BibleContext = createContext<{
  bibles: BibleType[],
  setBibles: Dispatch<SetStateAction<BibleType[]>>
}>({
  bibles: [],
  setBibles: () => { }
});