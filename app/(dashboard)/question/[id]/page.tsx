"use client"

import { useEffect, useRef, useState } from "react";
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
  const [content, setContent] = useState<string>('');

  const scrollAreaRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const scrollArea = scrollAreaRef?.current?.childNodes[1] as HTMLElement;

    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [replys])

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  const onClickSubmitButton = async () => {

    if (content.trim() === '') {
      alert('내용을 입력하세요.');
      return;
    }

    try {
      const res = await fetch(`/api/question_reply`, {
        method: "POST",
        body: JSON.stringify({
          question_id: replys[0].question_id,
          user_id: 'admin',
          content,
          is_active: true,
          is_replier: true
        }),
      });

      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(data.error);
      }

      // add new reply to list
      setReplys([...replys, {
        ...data.reply,
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString()
      }]);

      alert('답변이 저장되었습니다.');

      setContent('');

    } catch (e) {
      console.error(e);
      alert('답변을 저장하는데 실패했습니다.');
    }
  }

  if (isLoading || replys.length === 0) return <div>Loading...</div>

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{`${replys[0].user_name}님의 질문입니다.`}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* record of question */}
          <ScrollArea ref={scrollAreaRef} className="h-[60vh] rounded-md border p-4">
            {replys.map((row) => <Reply key={row.question_reply_id} reply={row} />)}
          </ScrollArea>

          <hr className="mt-4 mb-4" />

          {/* Input for reply */}
          <div>
            <Textarea placeholder="답변을 입력하세요." value={content} onChange={onChangeContent} />
            <div className="flex justify-between mt-3">
              <div></div>
              <Button onClick={onClickSubmitButton}>답변하기</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}