import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Plan from "./plan";
import { PlanType } from "@/lib/db/type";
import Link from "next/link";

export default function PlansTable({ plans }: { plans: PlanType[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>기도 플랜 관리</CardTitle>
        <CardDescription>
          기도 플랜을 생성하고 관리하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>기도 플랜 제목</TableHead>
              <TableHead className="hidden md:table-cell">수정 날짜</TableHead>
              <TableHead className="hidden md:table-cell">생성 날짜</TableHead>
              <TableHead>수정</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Content */}
            {plans.map((plan) => (
              <Plan key={plan.id} plan={plan} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-[100%]">
          <div></div>
          <Button>
            <Link href="/plan/-1">
              기도 플랜 생성하기
            </Link>
          </Button>
        </div>
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