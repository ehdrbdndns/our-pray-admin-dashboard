import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogDescription } from "@/components/ui/dialog";
import { DialogFooter } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { RadioGroup } from "@/components/ui/radio-group";
import { TableCell, TableRow } from "@/components/ui/table";

export default function User() {
  return (
    <TableRow>
      <TableCell className="hidden md:table-cell">ID</TableCell>
      <TableCell className="font-medium">이름</TableCell>
      <TableCell className="font-medium">이메일</TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline" className="capitalize">
          Active
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline" className="capitalize">
          ON
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline" className="capitalize">
          {/* 일반 사용자 or 관리자 */}
          일반 사용자
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">2024.01.01</TableCell>
      <TableCell>
        {/* Modal Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">열람</Button>
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
                <RadioGroup defaultValue="admin">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">관리자</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="counselor" id="counselor" />
                    <Label htmlFor="counselor">상담가</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">사용자</Label>
                  </div>
                </RadioGroup>
              </div>
              <hr />
              <div className="flex justify-around items-center">
                <Label htmlFor="username" className="text-right">
                  활동 상태
                </Label>
                <RadioGroup defaultValue="active">
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
              <Button type="submit">변경하기</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  )
}