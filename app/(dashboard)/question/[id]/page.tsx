"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { ReplyType } from "@/lib/db/type";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Reply from "./reply";

export default function QuestionDetailPage() {

  const pathName = usePathname();

  const [replys, setReplys] = useState<ReplyType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const id = pathName.split("/")[2];

    const fetchReplys = async (question_id: string) => {
      setIsLoading(true);

      try {
        const res = await fetch(`/api/question_reply?question_id=${question_id}`, {
          method: "GET"
        });
        const data = await res.json();
        setReplys(data);
      } catch (e) {
        console.error(e);
      }

      setIsLoading(false);
    }

    fetchReplys(id);
  }, [pathName])

  if (isLoading || replys.length === 0) return <div>Loading...</div>

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{`${replys[0].user_name}님의 질문입니다.`}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* record of question */}
          <ScrollArea className="h-[60vh] rounded-md border p-4">
            {replys.map((row) => <Reply key={row.question_reply_id} reply={row} />)}
          </ScrollArea>

          <hr className="mt-4 mb-4" />

          {/* Input for reply */}
          <div>
            <Textarea placeholder="답변을 입력하세요." />
            <div className="flex justify-between mt-3">
              <div></div>
              <Button>답변하기</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}