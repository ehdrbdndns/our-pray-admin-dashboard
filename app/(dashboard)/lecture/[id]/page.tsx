import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Lecture from "./lecture";
import { retrieveLecturesByPlanId } from "@/lib/serverActions/lecture";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function LecturePage({ params }: { params: { id: string } }) {

  const { id } = params;
  const lectures = await retrieveLecturesByPlanId(id);

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
            <div className="flex justify-end w-full">
              <Link href={`${id}/create`}>
                <Button>강의 생성</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}