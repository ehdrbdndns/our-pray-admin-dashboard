"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlarmType } from "@/lib/db/type";
import { Loader2 } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { AlarmContext } from "./alarm-provider";

export default function AlarmFromModal({ alarm, mode }: { alarm?: AlarmType, mode: 'create' | 'update' }) {

  const { alarms, setAlarms } = useContext(AlarmContext);

  const [title, setTitle] = useState<string>(alarm?.title || '');
  const [message, setMessage] = useState<string>(alarm?.message || '');
  const [date, setDate] = useState<string>(alarm?.date || '');
  const [isLoading, setIsLoading] = useState(false);

  const triggerBtn = useRef<HTMLButtonElement>(null);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);
  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value);

  const onClickSubmitButton = async () => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/alarm', {
        method: mode === 'create' ? 'POST' : 'PATCH',
        body: JSON.stringify({
          title,
          message,
          alarm_id: alarm?.alarm_id || null,
          next_notification_date: date
        })
      });

      const data = await res.json();
      console.log(data);
      if (res.status !== 200) {
        throw new Error(data.error);
      }

      alert('알람 정보를 저장하는데 성공했습니다.');

      setAlarms([data.alarm, ...alarms]);

      triggerBtn.current?.click();
    } catch (e) {
      console.error(e);
      alert('알람 정보를 저장하는데 실패했습니다.');
    }

    setIsLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={triggerBtn}>
          {mode === 'create' ? '알람 생성' : '알람 수정'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>알람 내용 {mode === 'create' ? '생성' : '수정'}</DialogTitle>
          <DialogDescription>
            사용자에게 전송할 알람 내용을 {mode === 'create' ? '생성' : '수정'}합니다.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="title">제목 (필수)</Label>
          <Input
            type="text"
            id="title"
            className="mb-3"
            value={title}
            onChange={onTitleChange}
          />
          <Label htmlFor="content">내용 (필수)</Label>
          <Textarea
            placeholder="알람 내용을 적어주세요"
            id="content"
            className="mb-3"
            value={message}
            onChange={onMessageChange}
          />
          <Label htmlFor="date">예약 알림 날짜 (선택)</Label>
          <Input
            type="date"
            id="date"
            value={date}
            onChange={onDateChange}
          />
        </div>
        <DialogFooter>
          <Button onClick={onClickSubmitButton}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : mode === 'create' ? '생성' : '수정'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}