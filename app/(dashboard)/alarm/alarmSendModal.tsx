import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AlarmSendModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>전송</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>알람 전송 주의</DialogTitle>
          <DialogDescription>
            모든 사용자에게 알림을 전송합니다.
          </DialogDescription>
        </DialogHeader>
        <div>
          {"{제목}에 대한 알림을 전송하시겠습니까?"}
        </div>
        <DialogFooter>
          <Button type="submit">전송</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}