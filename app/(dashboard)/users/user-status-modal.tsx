"use client"

import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogDescription } from "@/components/ui/dialog";
import { DialogFooter } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { RadioGroup } from "@/components/ui/radio-group";
import { UserType } from "@/lib/serverActions/type";

export default function UserStatusModal({ user }: { user: UserType }) {
  const [role, setRole] = useState<string>(user.role);
  const [status, setStatus] = useState<string>(user.status);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const triggerBtn = useRef<HTMLButtonElement>(null);

  const onRoleChange = (v: string) => {
    setRole(v);
  }

  const onStatusChange = (v: string) => {
    setStatus(v);
  }

  const onClickModalButton = () => {
    setRole(user.role);
    setStatus(user.status);
  }

  const updateUserState = async () => {
    setIsLoading(true);

    console.log(process.env.API_URL);

    try {
      // fetch
      await fetch(`/api/user/status`, {
        method: 'POST',
      });
    } catch (e) {
      console.error(e);
      throw new Error('사용자 상태 변경에 실패했습니다.');
    }

    setIsLoading(false);
  }

  const onClickUpdateButton = async () => {
    try {
      await updateUserState();
    } catch (e) {
      alert(e);
    }

    alert('사용자 상태가 변경되었습니다.');
    triggerBtn.current?.click();
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button ref={triggerBtn} onClick={onClickModalButton}>열람</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>"이름" 권한 및 상태 변경</DialogTitle>
            <DialogDescription>
              사용자의 권한을 변경할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-around items-center">
              <Label htmlFor="name" className="text-right">
                권한 상태
              </Label>
              <RadioGroup onValueChange={onRoleChange} defaultValue={role}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">관리자</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="counselor" id="counselor" />
                  <Label htmlFor="counselor">상담가</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user">사용자</Label>
                </div>
              </RadioGroup>
            </div>
            <hr />
            <div className="flex justify-around items-center">
              <Label htmlFor="username" className="text-right">
                활동 상태
              </Label>
              <RadioGroup onValueChange={onStatusChange} defaultValue={status}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active">활동</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inactive" id="inactive" />
                  <Label htmlFor="inactive">정지</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="banned" id="banned" />
                  <Label htmlFor="banned">벤</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onClickUpdateButton} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}
              {isLoading ? '변경 중...' : '변경하기'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog >
    </>
  )
}