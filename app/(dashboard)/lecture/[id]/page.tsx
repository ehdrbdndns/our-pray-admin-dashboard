import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Lecture from "./lecture";
import LectureFormModal from "./lecture-form-modal";

export default function LecturePage() {
  return (
    <>
      {/* 강의 정보 */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>강의 정보</CardTitle>
            <CardDescription>기도 플랜에 대한 강의를 관리합니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden md:table-cell">ID</TableHead>
                  <TableHead>강의 제목</TableHead>
                  <TableHead className="hidden md:table-cell">생성 날짜</TableHead>
                  <TableHead className="hidden md:table-cell">수정 날짜</TableHead>
                  <TableHead>수정</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Content */}
                <Lecture />
                <Lecture />
                <Lecture />
                <Lecture />
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            {/* Create Lecture Brn */}
            <div className="flex justify-between w-full">
              <div></div>
              <LectureFormModal />
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}