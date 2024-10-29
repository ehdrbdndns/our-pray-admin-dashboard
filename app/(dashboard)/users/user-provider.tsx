"use client"

import { UserType } from "@/lib/db/type";
import { createContext, Dispatch, SetStateAction } from "react";

export const UserContext = createContext<{
  users: UserType[],
  setUsers: Dispatch<SetStateAction<UserType[]>>
}>({
  users: [],
  setUsers: () => { }
});