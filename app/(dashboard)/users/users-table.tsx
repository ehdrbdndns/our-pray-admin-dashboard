import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import User from "./user";

export default function UsersTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>사용자 관리</CardTitle>
        <CardDescription>
          사용자를 관리하고 사용자의 활동을 확인하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">ID</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>이름</TableHead>
              <TableHead className="hidden md:table-cell">활동상태</TableHead>
              <TableHead className="hidden md:table-cell">알림상태</TableHead>
              <TableHead className="hidden md:table-cell">권한</TableHead>
              <TableHead className="hidden md:table-cell">가입 날짜</TableHead>
              <TableHead>수정</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <User />
            <User />
            <User />
            <User />
            <User />
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