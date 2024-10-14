import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import BibleFormModal from "./alarm-form-modal";
import Alarm from "./alarm";

export default function AlarmTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>알람 문구 관리</CardTitle>
        <CardDescription>
          알람 문구를 생성, 삭제 및 전송할 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">ID</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="hidden md:table-cell">내용</TableHead>
              <TableHead className="hidden md:table-cell">생성 날짜</TableHead>
              <TableHead>전송</TableHead>
              <TableHead>수정</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Alarm />
            <Alarm />
            <Alarm />
            <Alarm />
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-[100%]">
          <div></div>
          <BibleFormModal />
        </div>
      </CardFooter>
    </Card>
  )
}