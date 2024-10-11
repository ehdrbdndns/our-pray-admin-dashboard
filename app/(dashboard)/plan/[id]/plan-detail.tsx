import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import Lecture from "./lecture";
import LectureFormModal from "./lecture-form-modal";

export default function PlanDetail() {
  return (
    <div className="flex flex-col gap-5">
      <div className="columns-1 md:columns-2">
        {/* 기도 플랜 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>기도 플랜 정보</CardTitle>
            <CardDescription>기도 플랜 정보를 입력하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 mb-5">
              <Label>플랜 제목</Label>
              <Input placeholder="플랜 제목을 입력해주세요." />
            </div>
            <div className="flex flex-col gap-2">
              <Label>소개</Label>
              <Textarea placeholder="플랜 소개 글을 작성해주세요." />
            </div>
          </CardContent>
        </Card>
        {/* 저자 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>저자 정보</CardTitle>
            <CardDescription>저자 정보를 입력하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="columns-2">
              <div className="flex flex-col gap-2 mb-5">
                <Label>저자 이름</Label>
                <Input placeholder="저자 이름을 입력해주세요." />
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <Label>프로필</Label>
                <Input type="file" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>저자 소개</Label>
              <Textarea placeholder="저자에 대한 소개를 적어주세요." />
            </div>
          </CardContent>
        </Card>
      </div>
      <hr />
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
    </div>
  )
}