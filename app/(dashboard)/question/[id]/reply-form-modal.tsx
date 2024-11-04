"use client"

import { useContext, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil } from "lucide-react";
import { ReplyContext } from "./reply-provider";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function ReplyFormModal({
  question_reply_id, question_id, initValue
}: {
  question_reply_id: string, question_id: string, initValue: string
}) {
  const { setReplys } = useContext(ReplyContext);
  const triggerBtn = useRef<HTMLButtonElement>(null);

  const [content, setContent] = useState<string>(initValue);
  const [isLoading, setIsLoading] = useState(false);

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  const onClickDeleteButton = async () => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/question_reply', {
        method: 'DELETE',
        body: JSON.stringify({
          question_reply_id
        })
      })

      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(data.error);
      }

      // Use setTimeout to ensure that the click event of triggerBtn is executed first,
      triggerBtn.current?.click();
      setTimeout(() => {
        setReplys((prev) => {
          return prev.filter((reply) => reply.question_reply_id !== question_reply_id);
        })
      }, 100)

      alert('답변이 삭제되었습니다.');

    } catch (e) {
      console.error(e);
      alert('답변을 삭제하는데 실패했습니다.');
    }

    setIsLoading(false);
  }

  const onClickSubmitButton = async () => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/question_reply', {
        method: 'PATCH',
        body: JSON.stringify({
          question_reply_id,
          question_id,
          content
        })
      })

      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(data.error);
      }

      setReplys((prev) => {
        return prev.map((reply) => {
          if (reply.question_reply_id === question_reply_id) {
            return {
              ...reply,
              content
            }
          }

          return reply;
        })
      })

      alert('답변이 수정되었습니다.');

      triggerBtn.current?.click();
    } catch (e) {
      console.error(e);
      alert('답변을 수정하는데 실패했습니다.');
    }

    setIsLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={triggerBtn} className="cursor-pointer" size={"icon"} variant="ghost">
          <Pencil size={15} strokeWidth={2} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>수정하기</DialogTitle>
          <DialogDescription>
            답변 내용을 수정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Textarea
            placeholder="답변 내용을 입력하세요"
            id="content"
            value={content}
            onChange={onContentChange}
          />
        </div>
        <DialogFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={'destructive'} disabled={isLoading}>
                삭제
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
                <AlertDialogDescription>
                  삭제한 데이터는 복구할 수 없습니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={onClickDeleteButton}>
                  {
                    isLoading
                      ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      : '삭제'
                  }
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button onClick={onClickSubmitButton} disabled={isLoading}>
            {
              isLoading
                ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                : '수정'
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}