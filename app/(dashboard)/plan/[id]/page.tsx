"use client"

import PlanDetail from "./plan-detail";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PlanType } from "@/lib/db/type";

export default function PlanDetailPage({ }) {

  const pathName = usePathname();

  const [plan, setPlan] = useState<PlanType>();
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<'create' | 'update'>('create');

  useEffect(() => {
    const plan_id = pathName.split("/")[2];

    const fetchPlan = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(`/api/plan/${plan_id}`, {
          method: "GET"
        });

        const data = await res.json();

        if (res.status !== 200) {
          throw new Error(data.error);
        }

        setPlan(data);

      } catch (e) {
        console.error(e);
        alert("기도 플랜 정보를 가져오는데 실패했습니다.");
      }

      setIsLoading(false);
    }

    if (plan_id === '-1') {
      setMode('create');
      setPlan({
        plan_id: '-1',
        title: '',
        description: '',
        author_name: '',
        author_description: '',
        author_profile: '',
        is_active: false,
        updated_date: '',
        created_date: ''
      } as PlanType);
      setIsLoading(false);
    } else {
      setMode('update');
      fetchPlan();
    }
  }, [pathName])

  if (isLoading) return <div>Loading...</div>

  if (!plan) return <div>Plan not found</div>

  return (
    <div>
      <PlanDetail plan={plan} mode={mode} />
    </div>
  )
}