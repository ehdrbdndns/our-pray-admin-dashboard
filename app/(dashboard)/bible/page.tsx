"use client"

import { useEffect, useState } from "react";
import BibleTable from "./bible-table";
import { BibleType } from "@/lib/db/type";
import { BibleContext } from "./bible-provider";

export default function BiblePage() {
  const [bibles, setBibles] = useState<BibleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBibles = async () => {
      try {
        const res = await fetch('/api/bible')

        const bibles = await res.json();

        setBibles(bibles);
      } catch (e) {
        console.error(e);
        alert('성경 정보를 가져오는데 실패했습니다. 관리자에게 문의하세요.');
      }
      setIsLoading(false);
    }

    fetchBibles();
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <BibleContext.Provider value={{ bibles, setBibles }}>
        <BibleTable bibles={bibles} />
      </BibleContext.Provider>
    </>
  )
}