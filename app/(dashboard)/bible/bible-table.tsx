import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Bible from "./bible";
import BibleFormModal from "./bible-form-modal";
import { BibleType } from "@/lib/db/type";

export default function BibleTable({ bibles }: { bibles: BibleType[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>성경 문구 관리</CardTitle>
        <CardDescription>
          성경 문구를 추가 및 삭제할 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>제목</TableHead>
              <TableHead className="hidden md:table-cell">내용</TableHead>
              <TableHead className="hidden md:table-cell">생성 날짜</TableHead>
              <TableHead>수정</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bibles.map(bible => <Bible key={bible.bible_quote_id} bible={bible} />)}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-[100%]">
          <div></div>
          <BibleFormModal mode="create" />
        </div>
      </CardFooter>
    </Card>
  )
}