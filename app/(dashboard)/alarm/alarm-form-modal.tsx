import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AlarmFromModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>생성 or 수정</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>알람 내용 생성</DialogTitle>
          <DialogDescription>
            사용자에게 전송할 알람 내용을 생성합니다.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="title">제목</Label>
          <Input type="text" id="title" className="mb-3" />
          <Label htmlFor="content">내용</Label>
          <Textarea placeholder="알람 내용을 적어주세요" id="content" />
        </div>
        <DialogFooter>
          <Button type="submit">생성 및 수정</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}