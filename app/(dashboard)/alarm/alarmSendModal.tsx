import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlarmType } from "@/lib/db/type";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";

export default function AlarmSendModal({ alarm }: { alarm: AlarmType }) {

  const [isLoading, setIsLoading] = useState(false);
  const triggerBtn = useRef<HTMLButtonElement>(null);

  const onClickSubmitBtn = async () => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/alarm/send', {
        method: 'POST',
        body: JSON.stringify({
          alarm_id: alarm.alarm_id
        })
      });

      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(data.error);
      }

      triggerBtn.current?.click();
      // Use setTimeout to ensure that the click event of triggerBtn is executed first,
      alert('알람 전송에 성공했습니다.');
    } catch (e) {
      console.error(e);
      alert('알림 전송에 실패했습니다.');
    }

    setIsLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={triggerBtn}>전송</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>알람 전송 주의</DialogTitle>
          <DialogDescription>
            모든 사용자에게 알림을 전송합니다.
          </DialogDescription>
        </DialogHeader>
        <div>
          {`"${alarm.title}"에 대한 알림을 전송하시겠습니까?`}
        </div>
        <DialogFooter>
          <Button onClick={onClickSubmitBtn}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : '전송'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}