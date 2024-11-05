"use client"

import { useEffect, useState } from "react";
import PlansTable from "./plans-table";
import { PlanType } from "@/lib/db/type";

export default function PlanPage() {

  const [plans, setPlans] = useState<PlanType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/plan');
        const data = await res.json();

        if (res.status !== 200) {
          throw new Error(data.error);
        }
        setPlans(data);
      } catch (e) {
        console.error(e);
        alert("기도 플랜 정보를 가져오는데 실패했습니다.");
      }
      setIsLoading(false);
    }

    fetchPlans();
  }, []);

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      {/* Content */}
      <PlansTable plans={plans} />
    </>
  )
}