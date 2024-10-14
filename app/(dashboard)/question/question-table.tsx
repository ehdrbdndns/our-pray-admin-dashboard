import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Question from "./question";

export default function QuestionTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>기도 질문 관리</CardTitle>
        <CardDescription>
          사용자가 올린 기도 질문을 관리하고 답변하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">ID</TableHead>
              <TableHead>질문자</TableHead>
              <TableHead className="hidden md:table-cell">내용</TableHead>
              <TableHead className="hidden md:table-cell">생성 날짜</TableHead>
              <TableHead>답변상태</TableHead>
              <TableHead>보기</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Question />
            <Question />
            <Question />
            <Question />
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        {/* <form className="flex items-center w-full justify-between">
        <div className="text-xs text-muted-foreground">
          Showing{' '}
          <strong>
            {Math.min(offset - productsPerPage, totalProducts) + 1}-{offset}
          </strong>{' '}
          of <strong>{totalProducts}</strong> products
        </div>
        <div className="flex">
          <Button
            formAction={prevPage}
            variant="ghost"
            size="sm"
            type="submit"
            disabled={offset === productsPerPage}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Prev
          </Button>
          <Button
            formAction={nextPage}
            variant="ghost"
            size="sm"
            type="submit"
            disabled={offset + productsPerPage > totalProducts}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form> */}
      </CardFooter>
    </Card>
  )
}